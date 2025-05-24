import { ColorSchemeName, Colors } from "@/theme/Colors";

export const getChartThemeColors = (
  colorScheme: ColorSchemeName,
  primaryColor?: string,
  secondaryColor?: string
) => {
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  const gridColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.tabBarBackground;

  const chartColor =
    primaryColor ||
    (colorScheme === "dark" ? Colors.dark.secondary : Colors.light.secondary);

  const chartFillColor =
    secondaryColor ||
    (colorScheme === "dark"
      ? "rgba(92, 225, 230, 0.2)"
      : "rgba(46, 134, 193, 0.2)");

  return {
    textColor,
    gridColor,
    chartColor,
    chartFillColor,
  };
};

export const getPointerConfig = (
  colorScheme: ColorSchemeName,
  chartColor: string
) => {
  return {
    pointerStripColor:
      colorScheme === "dark" ? Colors.dark.textColorLight : "rgba(0,0,0,0.4)",
    pointerColor: chartColor,
    activatePointersOnLongPress: true,
    autoAdjustPointerLabelPosition: true,
  };
};

export const getLineChartConfig = (
  textColor: string,
  gridColor: string,
  chartColor: string,
  chartFillColor: string,
  maxValue: number
) => {
  return {
    height: 280,
    width: 300,
    spacing: 40,
    color: chartColor,
    thickness: 2,
    startFillColor: chartColor,
    endFillColor: chartFillColor,
    startOpacity: 0.7,
    endOpacity: 0.1,
    initialSpacing: 16,
    endSpacing: 16,
    noOfSections: 5,
    yAxisTextStyle: { color: textColor },
    xAxisLabelTextStyle: {
      color: textColor,
      fontSize: 10,
      marginTop: 6,
    },
    hideRules: true,
    hideYAxisText: false,
    xAxisColor: gridColor,
    yAxisColor: gridColor,
    yAxisTextNumberOfLines: 1,
    rulesType: "solid",
    rulesColor: gridColor,
    xAxisLabelsHeight: 20,
    maxValue: maxValue,
    dataPointsColor: chartColor,
    showValuesAsDataPointsText: false,
  };
};
