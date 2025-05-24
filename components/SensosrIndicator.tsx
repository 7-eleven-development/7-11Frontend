import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import { Fontisto } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { IconName } from "@/types/icons";
import { getBackgroundColor } from "@/utils/cardUtils";

type SeensorIndicatorProps = {
  icon: IconName;
  value: number;
  label: string;
  type: string;
  valueLabel?: string;
  status: "good" | "bad" | "normal";
  onPress?: () => void;
};

const SensorIndicator = ({
  icon,
  value,
  label,
  type,
  valueLabel = "dB",
  status,
  onPress,
}: SeensorIndicatorProps) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  const backgroundColor = getBackgroundColor(status, colorScheme);

  return (
    <ThemedView
      style={styles.container}
      lightColor={backgroundColor}
      darkColor={backgroundColor}
    >
      <Pressable onPress={onPress}>
        <ThemedText type="title" lightColor={textColor} darkColor={textColor}>
          Nuvarande {type}
        </ThemedText>
        <View style={styles.rowContainer}>
          <Fontisto
            name={icon}
            size={64}
            style={styles.icon}
            color={textColor}
          />
          <View>
            <ThemedText
              type="subtitle"
              lightColor={textColor}
              darkColor={textColor}
            >
              {value} {valueLabel}
            </ThemedText>
            <ThemedText lightColor={textColor} darkColor={textColor}>
              {label}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 10,
    width: "100%",
  },
  icon: {
    marginBottom: 16,
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
});

export default SensorIndicator;
