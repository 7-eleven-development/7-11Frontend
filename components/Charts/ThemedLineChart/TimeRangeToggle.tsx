import { View, StyleSheet, Pressable } from "react-native";
import ThemedText from "@/components/ThemedText";
import useChartContext from "@/context/chart/useChartContext";

interface TimeRangeToggleProps {
  timeRange: "weekly" | "monthly";
  setTimeRange: (range: "weekly" | "monthly") => void;
}

const TimeRangeToggle: React.FC<TimeRangeToggleProps> = ({
  timeRange,
  setTimeRange,
}) => {
  const { textColor, chartColor } = useChartContext();

  return (
    <View style={styles.toggleContainer}>
      <Pressable
        style={[styles.toggleButton]}
        onPress={() => setTimeRange("weekly")}
      >
        <ThemedText
          style={[
            styles.toggleText,
          ]}
          lightColor={timeRange === "weekly" ? chartColor : textColor}
          darkColor={timeRange === "weekly" ? chartColor : textColor}
        >
          Vecka
        </ThemedText>
      </Pressable>

      <Pressable
        style={[styles.toggleButton]}
        onPress={() => setTimeRange("monthly")}
      >
        <ThemedText
          style={[
            styles.toggleText,
           
          ]}
          lightColor={timeRange === "monthly" ? chartColor : textColor}
          darkColor={timeRange === "monthly" ? chartColor : textColor}
        >
          Månad
        </ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default TimeRangeToggle;
