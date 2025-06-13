import { View, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/theme/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

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
  const {colorScheme, text} = useColorScheme();
  

  const themedContainer =
    colorScheme === "dark"
      ? styles.hoverValueContainerDark
      : styles.hoverValueContainerLight;

  if (hoveredValue === null)
    return <View style={themedContainer}></View>;

  const isDangerous =
    dangerThreshold !== undefined && hoveredValue >= dangerThreshold;

  return (
    <View style={themedContainer}>
      <ThemedText
        lightColor={text}
        darkColor={text}
        style={styles.hoveredValueLabel}
      >
        {hoveredLabel}:
      </ThemedText>
      <ThemedText
        lightColor={text}
        darkColor={text}
        style={[styles.hoveredValue, isDangerous ? styles.dangerousValue : {}]}
      >
        {hoveredValue} {unit}
      </ThemedText>
    </View>
  );
};

export const styles = StyleSheet.create({
  hoverValueContainerDark: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.dark.tabBarBackground,
    borderRadius: 8,
    minHeight: 36,
    minWidth: 120,
  },
  hoverValueContainerLight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.light.tabBarBackground,
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
