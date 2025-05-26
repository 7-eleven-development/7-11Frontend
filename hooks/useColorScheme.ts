import useUserContext from "@/context/user/useUserContext";

export function useColorScheme(): "light" | "dark" {
  const { actualTheme } = useUserContext();
  return actualTheme;
}
