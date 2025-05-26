import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Colors } from "@/theme/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { actualTheme } = useContext(UserContext);

  if (props[actualTheme]) return props[actualTheme]!;

  return Colors[actualTheme][colorName];
}