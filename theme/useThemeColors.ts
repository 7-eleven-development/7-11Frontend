import useUserContext from "@/context/user/useUserContext";
import { Colors } from "@/theme/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { actualTheme } = useUserContext();

  if (props[actualTheme]) return props[actualTheme]!;

  return Colors[actualTheme][colorName];
}
