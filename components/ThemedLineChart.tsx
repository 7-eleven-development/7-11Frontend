import React, { useState, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LineChart, yAxisSides } from "react-native-gifted-charts";
import { Colors, ColorSchemeName } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";

interface DataPoint {
  value: number;
  label: string;
  dataPointText?: string;
}

interface DataChartProps {
  hourlyData: DataPoint[];
  weeklyData: DataPoint[];
  monthlyData: DataPoint[];
  title: string;
  unit: string;
  colorScheme: ColorSchemeName;
  primaryColor?: string;
  secondaryColor?: string;
}

const ThemedLineChart: React.FC<DataChartProps> = ({
  hourlyData,
  weeklyData,
  monthlyData,
  title,
  unit,
  colorScheme,
  primaryColor,
  secondaryColor,
}) => {
  const [timeRange, setTimeRange] = useState<"hourly" | "weekly" | "monthly">(
    "hourly"
  );

  // Process data to handle label display
  const displayData = useMemo(() => {
    const rawData =
      timeRange === "hourly"
        ? hourlyData
        : timeRange === "monthly"
        ? monthlyData
        : weeklyData;

    // For hourly view, create data with every other label empty
    if (timeRange === "hourly") {
      return rawData.map((item, i) => ({
        ...item,
        // Keep the value but only show labels for even indices
        showLabel: i % 2 === 0,
        label: i % 2 === 0 ? item.label : "",
      }));
    }

    // For monthly view
    if (timeRange === "monthly") {
      return rawData.map((item, i) => ({
        ...item,
        showLabel: i % 5 === 0,
        label: i % 5 === 0 ? item.label : "",
      }));
    }

    return rawData;
  }, [hourlyData, weeklyData, monthlyData, timeRange]);


  // Chart styling based on theme
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;
  const gridColor =
    colorScheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

  // Chart colors
  const chartColor =
    primaryColor || (colorScheme === "dark" ? "#5CE1E6" : "#2E86C1");
  const chartFillColor =
    secondaryColor ||
    (colorScheme === "dark"
      ? "rgba(92, 225, 230, 0.2)"
      : "rgba(46, 134, 193, 0.2)");

  return (
    <ThemedView style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <ThemedText
          style={styles.chartTitle}
          lightColor={textColor}
          darkColor={textColor}
        >
          {timeRange === "hourly"
            ? `Last 24 Hours ${title}`
            : timeRange === "monthly"
            ? `Past Month ${title}`
            : `Past Week ${title}`}
        </ThemedText>

        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              timeRange === "hourly" && styles.activeToggleButton,
              { borderColor: textColor },
            ]}
            onPress={() => setTimeRange("hourly")}
          >
            <ThemedText
              style={[
                styles.toggleText,
                timeRange === "hourly" && styles.activeToggleText,
              ]}
              lightColor={timeRange === "hourly" ? "#fff" : textColor}
              darkColor={timeRange === "hourly" ? "#fff" : textColor}
            >
              Day
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              timeRange === "weekly" && styles.activeToggleButton,
              { borderColor: textColor },
            ]}
            onPress={() => setTimeRange("weekly")}
          >
            <ThemedText
              style={[
                styles.toggleText,
                timeRange === "weekly" && styles.activeToggleText,
              ]}
              lightColor={timeRange === "weekly" ? "#fff" : textColor}
              darkColor={timeRange === "weekly" ? "#fff" : textColor}
            >
              Week
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              timeRange === "monthly" && styles.activeToggleButton,
              { borderColor: textColor },
            ]}
            onPress={() => setTimeRange("monthly")}
          >
            <ThemedText
              style={[
                styles.toggleText,
                timeRange === "monthly" && styles.activeToggleText,
              ]}
              lightColor={timeRange === "monthly" ? "#fff" : textColor}
              darkColor={timeRange === "monthly" ? "#fff" : textColor}
            >
              Month
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <LineChart
        data={displayData}
        height={200}
        width={300}
        spacing={
          timeRange === "hourly" ? 12 : timeRange === "monthly" ? 10 : 40
        }
        color={chartColor}
        thickness={3}
        startFillColor={chartColor}
        endFillColor={chartFillColor}
        startOpacity={0.7}
        endOpacity={0.1}
        initialSpacing={16}
        endSpacing={16}
        noOfSections={5}
        yAxisTextStyle={{ color: textColor }}
        xAxisLabelTextStyle={{
          color: textColor,
          fontSize: 10,
          marginTop: 6,
        }}
        hideRules
        hideYAxisText={false}
        xAxisColor={gridColor}
        yAxisColor={gridColor}
        yAxisTextNumberOfLines={1}
        rulesType="solid"
        rulesColor={gridColor}
        yAxisSide={yAxisSides.LEFT}
        // Control which labels to show:
        // Remove the conditional label mapping since we've already handled it in the data
        xAxisLabelTexts={displayData.map((item) => item.label)}
        // Adjust labels height and angle as needed
        xAxisLabelsHeight={timeRange === "monthly" ? 30 : 20}
        rotateLabel={timeRange === "monthly"}
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor:
            colorScheme === "dark"
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.4)",
          pointerColor: chartColor,
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 30,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: { value: number }[]) => {
            return (
              <ThemedView style={styles.pointerLabel}>
                <ThemedText style={{ color: "#fff", fontWeight: "bold" }}>
                  {items[0].value} {unit}
                </ThemedText>
              </ThemedView>
            );
          },
        }}
      />
    </ThemedView>
  );
};

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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    marginHorizontal: 2,
    borderRadius: 4,
  },
  activeToggleButton: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "500",
  },
  activeToggleText: {
    color: "#fff",
  },
  pointerLabel: {
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 15,
  },
});

export default ThemedLineChart;
