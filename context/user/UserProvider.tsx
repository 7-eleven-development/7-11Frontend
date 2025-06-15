import { ReactNode, useState, useEffect, useCallback } from "react";
import { Appearance } from "react-native";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "./UserContext";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { UserProfile, userService } from "@/services/user";

type Theme = "light" | "dark" | "system";

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const systemColorScheme = Appearance.getColorScheme() ?? "light";
  const { isAuthenticated, token } = useAuthContext();

  const actualTheme: "light" | "dark" =
    theme === "system" ? systemColorScheme : theme;

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
};

export default UserProvider;
