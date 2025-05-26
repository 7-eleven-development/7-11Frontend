import { createContext } from "react";
import { UserContextType } from "@/types/user";

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