import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import * as SecureStore from "expo-secure-store";

export type Theme = "light" | "dark";

export function useColorScheme(): Theme {
  const systemColor = Appearance.getColorScheme() ?? "light";
  const [colorScheme, setColorScheme] = useState<Theme>(systemColor);

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await SecureStore.getItemAsync("theme");
      if (stored === "light" || stored === "dark") {
        setColorScheme(stored);
      } else {
        setColorScheme(systemColor);
      }
    };
    loadTheme();
  }, []);

  return colorScheme;
}

export async function setStoredColorScheme(theme: Theme) {
  await SecureStore.setItemAsync("theme", theme);
}
