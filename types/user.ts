import { UserProfile } from "@/services/user";

type Theme = "light" | "dark" | "system";

export interface UserContextType {
  theme: Theme;
  toggleTheme: () => void;
  actualTheme: "light" | "dark";
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}
export interface User {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
}
