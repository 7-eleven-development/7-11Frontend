import { UserProfile, userService } from "@/services/user";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { View } from "react-native";
import { useAuthContext } from "@/context/auth/useAuthContext";

// Vi skapar en typ för våran användare

type Theme = "light" | "dark";

interface UserContextType {
  theme: Theme;
  toggleTheme: () => void;
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const UserContext = createContext<UserContextType>({
  theme: "light",
  toggleTheme: () => {},
  user: null,
  setUser: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

// Context Provider komponent som omsluter appen
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState<UserProfile | null>(null);

  const { isAuthenticated, token } = useAuthContext();

  useEffect(() => {
    async function loadUser() {
      if (token) {
        const result = await userService.fetchUserInformation(token);
        if (result.success && result.data) {
          setUser(result.data);
        } else {
          console.error("Failed to load user data:", result.error);
        }
      } else {
        setUser(null); // om ingen token, sätt user till null
      }
    }
    loadUser();
  }, [token]); // kör om token ändras

  const getUser = async () => {
    if (isAuthenticated) {
      if (token) {
        const userInfo = await userService.fetchUserInformation(token);
        console.log(userInfo);
      }
    }
  };
  getUser();
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <UserContext.Provider value={{ theme, toggleTheme, user, setUser }}>
      <View
        style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#fff" }}
      >
        {children}
      </View>
    </UserContext.Provider>
  );
}

// Hook för att enklare använda context
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
