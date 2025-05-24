import { TouchableOpacity, View, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { ColorSchemeName, Colors } from "@/theme/Colors";

interface TimeRangeToggleProps {
  timeRange: "weekly" | "monthly";
  setTimeRange: (range: "weekly" | "monthly") => void;
  colorScheme: ColorSchemeName;
}

const TimeRangeToggle: React.FC<TimeRangeToggleProps> = ({
  timeRange,
  setTimeRange,
  colorScheme,
}) => {
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => setTimeRange("weekly")}
      >
        <ThemedText
          style={[
            styles.toggleText,
            timeRange === "weekly" && styles.activeToggleText,
          ]}
          lightColor={timeRange === "weekly" ? Colors.light.text : textColor}
          darkColor={
            timeRange === "weekly" ? Colors.dark.textColorLight : textColor
          }
        >
          Vecka
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => setTimeRange("monthly")}
      >
        <ThemedText
          style={[
            styles.toggleText,
            timeRange === "monthly" && styles.activeToggleText,
          ]}
          lightColor={timeRange === "monthly" ? Colors.light.text : textColor}
          darkColor={
            timeRange === "monthly" ? Colors.dark.textColorLight : textColor
          }
        >
          Månad
        </ThemedText>
      </TouchableOpacity>
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
  activeToggleText: {
    color: Colors.dark.tint,
  },
});

export default TimeRangeToggle;
