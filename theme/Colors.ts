export type ColorScheme = "light" | "dark";
export type ColorSchemeName = ColorScheme | null | undefined;

const tintColorLight = "#0a7ea4";
const tintColorDark = "#00ADB5";

export const Colors = {
  light: {
    text: "#11181C",
    textColorLight: "#EEEEEE",
    background: "#D9D9D9",
    tabBarBackground: "#FFFFFF",
    tint: tintColorLight,
    tabIconDefault: "rgb(87, 96, 103)",
    tabIconSelected: tintColorLight,
    button: "#0a7ea4",

    secondary: "#5AC8FA",
    accent: "#FF9500",
    neutral: "#567D7F",
    error: "#EB8B8B",
    success: "#6AD36A",
  },

  dark: {
    text: "#11181C",
    textColorLight: "#EEEEEE",
    background: "#222831",
    tabBarBackground: "#393E46",
    tint: tintColorDark,
    tabIconDefault: "#B0B0B0",
    tabIconSelected: tintColorDark,
    button: "#00ADB5",

    secondary: "#64D2FF",
    accent: "#FFD60A",
    neutral: "#567D7F",
    error: "#EB8B8B",
    success: "#6AD36A",
  },
};
