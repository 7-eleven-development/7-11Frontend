export type ColorScheme = 'light' | 'dark';
export type ColorSchemeName = ColorScheme | null | undefined;

const tintColorLight = "#0a7ea4";
const tintColorDark = "#00ADB5";

export const Colors = {
  light: {
    text: " #11181C",
    textColorLight: "#EEEEEE",
    background: "#D9D9D9",
    tabBarBackground: "#D9D9D9",
    tint: tintColorLight,
    tabIconDefault: "rgb(87, 96, 103)",
    tabIconSelected: tintColorLight,

    secondary: "#5AC8FA",
    accent: "#FF9500",
    neutral: "#A9A9A9",
    error: "#FF3B30",
    success: "#34C759",
  },

  dark: {
    text: "#11181C",
    textColorLight: "#EEEEEE",
    background: "#222831",
    tabBarBackground: "#393E46",
    tint: tintColorDark,
    tabIconDefault: "#B0B0B0",
    tabIconSelected: tintColorDark,

    secondary: "#64D2FF",
    accent: "#FFD60A",
    neutral: "#567D7F",
    error: "#FF453A",
    success: "#32D74B",
  },
};

// lägga till CardBackground?
