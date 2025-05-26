import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export function useColorScheme(): "light" | "dark" {
  const { actualTheme } = useContext(UserContext);
  return actualTheme;
}
