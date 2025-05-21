import { User } from "@/types/user";
import { createContext, useState, ReactNode } from "react";
import { View } from "react-native";

// Vi skapar en typ för våran användare

type Theme = "light" | "dark";

// Typen för kontexten
interface UserContextType {
  theme: Theme;
  toggleTheme: () => void; //här växlar vi vårt tema
  user: User | null; // Datan är null om ingen användare än inloggad
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Funktion för att uppdatera och sätta en användare
}

// Skapa UserContext med rätt typ
export const UserContext = createContext<UserContextType>({
  theme: "light",
  toggleTheme: () => {},
  user: null,
  setUser: () => {},
});

interface UserContextProviderProps {
  children: ReactNode; //Detta innebär att alla våra children kommer att få tillgång till våran kontext
}

// UserContextProvider som hanterar både våran tema och användare
export function UserContextProvider({ children }: UserContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light"); //håller reda på temat
  const [user, setUser] = useState<User | null>(null); //håller reda på användaren

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
