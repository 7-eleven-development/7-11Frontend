import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { LineChart, yAxisSides } from "react-native-gifted-charts";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import TimeRangeToggle from "./TimeRangeToggle";
import HoverDisplay from "./HoverDisplay";
import { HistoricalDataPoint } from "@/types/historicalData";
import { useChartInteraction } from "@/hooks/useChartInteraction";
import useChartContext from "@/context/chart/useChartContext";

interface DataChartProps<T extends HistoricalDataPoint> {
  weeklyData: T[];
  monthlyData: T[];
  title: string;
  unit: string;
  valueKey: string;
  dangerThreshold?: number;
  maxValue?: number;
}

function ThemedLineChart<T extends HistoricalDataPoint>({
  weeklyData,
  monthlyData,
  title,
  unit,
  valueKey,
  dangerThreshold,
  maxValue,
}: DataChartProps<T>) {
  const {
    timeRange,
    setTimeRange,
    hoveredValue,
    hoveredLabel,
    handlePointerLabelComponent,
  } = useChartInteraction();

  const { textColor, chartConfig, pointerConfig, prepareChartData } =
    useChartContext();

  const finalChartConfig = useMemo(() => {
    if (maxValue) {
      return { ...chartConfig, maxValue };
    }
    return chartConfig;
  }, [chartConfig, maxValue]);

  const displayData = useMemo(
    () => prepareChartData(weeklyData, monthlyData, timeRange, valueKey),
    [weeklyData, monthlyData, timeRange, valueKey, prepareChartData]
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
        <TimeRangeToggle timeRange={timeRange} setTimeRange={setTimeRange} />
      </View>

      <LineChart
        key={timeRange}
        data={displayData}
        {...finalChartConfig}
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
