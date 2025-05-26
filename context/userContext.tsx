import { UserProfile, userService } from "@/services/user";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { Appearance } from "react-native";
import * as SecureStore from "expo-secure-store";

type Theme = "light" | "dark" | "system";

interface UserContextType {
  theme: Theme;
  toggleTheme: () => void;
  actualTheme: "light" | "dark";
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  theme: "system",
  toggleTheme: () => {},
  actualTheme: "light",
  user: null,
  setUser: () => {},
  isLoading: false,
  error: null,
  refreshUser: async () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const systemColorScheme = Appearance.getColorScheme() ?? "light";
  const { isAuthenticated, token } = useAuthContext();

  // Resolve the actual theme based on user preference and system theme
  const actualTheme: "light" | "dark" =
    theme === "system" ? systemColorScheme : theme;

  // Load stored theme on mount
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        const storedTheme = await SecureStore.getItemAsync("theme");
        if (
          storedTheme === "light" ||
          storedTheme === "dark" ||
          storedTheme === "system"
        ) {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.error("Failed to load stored theme:", error);
      }
    };
    loadStoredTheme();
  }, []);

  // Save theme to storage when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await SecureStore.setItemAsync("theme", theme);
      } catch (error) {
        console.error("Failed to save theme:", error);
      }
    };
    saveTheme();
  }, [theme]);

  const loadUser = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setUser(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await userService.fetchUserInformation(token);
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        setError(result.error || "Failed to load user data");
        setUser(null);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setUser(null);
      console.error("Error loading user:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      if (prev === "system") return "light";
      if (prev === "light") return "dark";
      return "system";
    });
  }, []);

  const refreshUser = useCallback(async () => {
    if (isAuthenticated && token) {
      await loadUser();
    }
  }, [loadUser, isAuthenticated, token]);

  return (
    <UserContext.Provider
      value={{
        theme,
        toggleTheme,
        actualTheme,
        user,
        setUser,
        isLoading,
        error,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
