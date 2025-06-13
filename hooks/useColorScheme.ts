import useUserContext from "@/context/user/useUserContext";
import { Colors } from "@/theme/Colors";

export function useColorScheme() {
  const { actualTheme } = useUserContext();

  return {
    colorScheme: actualTheme,
    text:
      actualTheme === "dark" ? Colors.dark.textColorLight : Colors.light.text,
    background:
      actualTheme === "dark" ? Colors.dark.background : Colors.light.background,
    tabBarBackground:
      actualTheme === "dark"
        ? Colors.dark.tabBarBackground
        : Colors.light.tabBarBackground,
    tint: actualTheme === "dark" ? Colors.dark.tint : Colors.light.tint,
    secondary:
      actualTheme === "dark" ? Colors.dark.tint : Colors.light.secondary,
    button: actualTheme === "dark" ? Colors.dark.button : Colors.light.button,
    icon: actualTheme === "dark" ? Colors.dark.tint : Colors.light.tint,
    border: actualTheme === "dark" ? Colors.dark.tint : Colors.light.secondary,
    error: Colors.dark.error,
  };
}
