import { useEffect, useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { LineChart, yAxisSides } from "react-native-gifted-charts";
import { ColorSchemeName, Colors } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import TimeRangeToggle from "@/components/Charts/ThemedLineChart/TimeRangeToggle";
import HoverDisplay from "./HoverDisplay";
import { prepareChartData } from "./utils/dataTransform";
import {
  getChartThemeColors,
  getLineChartConfig,
  getPointerConfig,
} from "./utils/chartConfig";
import { HistoricalDataPoint } from "@/types/historicalData";
import { useChartInteraction } from "@/hooks/useChartInteraction";

interface DataChartProps<T extends HistoricalDataPoint> {
  weeklyData: T[];
  monthlyData: T[];
  title: string;
  unit: string;
  colorScheme: ColorSchemeName;
  valueKey: string; // Property name to extract value from data points
  dangerThreshold?: number; // Optional threshold for dangerous values
  primaryColor?: string;
  secondaryColor?: string;
  maxValue?: number; // Optional max value for the chart
}

function ThemedLineChart<T extends HistoricalDataPoint>({
  weeklyData,
  monthlyData,
  title,
  unit,
  colorScheme,
  valueKey,
  dangerThreshold,
  primaryColor,
  secondaryColor,
  maxValue = 120,
}: DataChartProps<T>) {
  const {
    timeRange,
    setTimeRange,
    hoveredValue,
    hoveredLabel,
    handlePointerLabelComponent,
  } = useChartInteraction();

  const { textColor, gridColor, chartColor, chartFillColor } =
    getChartThemeColors(colorScheme, primaryColor, secondaryColor);

  const pointerConfig = getPointerConfig(colorScheme, chartColor);

  const chartConfig = getLineChartConfig(
    textColor,
    gridColor,
    chartColor,
    chartFillColor,
    maxValue
  );

  const displayData = useMemo(
    () => prepareChartData(weeklyData, monthlyData, timeRange, valueKey),
    [weeklyData, monthlyData, timeRange, valueKey]
  );

  return (
    <ThemedView style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <ThemedText
          type="subtitle"
          lightColor={textColor}
          darkColor={textColor}
        >
          {timeRange === "monthly"
            ? `Senaste månadens ${title}`
            : `Senaste veckans ${title}`}
        </ThemedText>
      </View>

      <View style={styles.toggleContainer}>
        <HoverDisplay
          hoveredValue={hoveredValue}
          hoveredLabel={hoveredLabel}
          unit={unit}
          dangerThreshold={dangerThreshold}
        />
        <TimeRangeToggle
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          colorScheme={colorScheme}
        />
      </View>

      <LineChart
        key={timeRange}
        data={displayData}
        {...chartConfig}
        yAxisSide={yAxisSides.LEFT}
        pointerConfig={{
          ...pointerConfig,
          pointerLabelComponent: handlePointerLabelComponent,
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 30,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  chartHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toggleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default ThemedLineChart;
