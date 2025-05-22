/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
// theme/useThemeColors.ts
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Colors } from "@/theme/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useContext(UserContext);

  if (props[theme]) return props[theme]!;

  return Colors[theme][colorName];
}