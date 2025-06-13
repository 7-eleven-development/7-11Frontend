import { View, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/theme/Colors";
import useChartContext from "@/context/chart/useChartContext";

interface HoverDisplayProps {
  hoveredValue: number | null;
  hoveredLabel: string;
  unit: string;
  dangerThreshold?: number;
}

const HoverDisplay: React.FC<HoverDisplayProps> = ({
  hoveredValue,
  hoveredLabel,
  unit,
  dangerThreshold,
}) => {
  const { textColor, gridColor, colorScheme } = useChartContext();

  const themedContainer =
    colorScheme === "dark"
      ? [styles.hoverValueContainer, { backgroundColor: gridColor }]
      : [styles.hoverValueContainer, { backgroundColor: gridColor }];

  if (hoveredValue === null) return <View style={themedContainer}></View>;

  const isDangerous =
    dangerThreshold !== undefined && hoveredValue >= dangerThreshold;

  return (
    <View style={themedContainer}>
      <ThemedText
        lightColor={textColor}
        darkColor={textColor}
        style={styles.hoveredValueLabel}
      >
        {hoveredLabel}:
      </ThemedText>
      <ThemedText
        lightColor={textColor}
        darkColor={textColor}
        style={[styles.hoveredValue, isDangerous ? styles.dangerousValue : {}]}
      >
        {hoveredValue} {unit}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  hoverValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 36,
    minWidth: 120,
  },
  hoveredValueLabel: {
    fontSize: 14,
    marginRight: 6,
  },
  hoveredValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dangerousValue: {
    color: Colors.dark.error,
  },
});

export default HoverDisplay;
