import { Colors } from "@/theme/Colors";

export interface ChartColors {
  text: string;
  grid: string;
  chart: string;
  fill: string;
  pointer: string;
}

export const getChartColors = (colorScheme: "light" | "dark"): ChartColors => {
  const isDark = colorScheme === "dark";
  
  return {
    text: isDark ? Colors.dark.textColorLight : Colors.light.text,
    grid: isDark ? Colors.dark.tabBarBackground : Colors.light.tabBarBackground,
    chart: isDark ? Colors.dark.secondary : Colors.light.secondary,
    fill: isDark 
      ? "rgba(92, 225, 230, 0.2)"
      : "rgba(46, 134, 193, 0.2)",
    pointer: isDark ? Colors.dark.textColorLight : "rgba(0,0,0,0.4)",
  };
};