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
  size?: "sm" | "lg";
  onPress?: () => void;
  isSelected?: boolean;
};

const SensorIndicator = ({
  icon,
  value,
  label,
  type,
  valueLabel = "dB",
  status,
  onPress,
  size = "lg",
  isSelected = false,
}: SeensorIndicatorProps) => {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  const backgroundColor = getBackgroundColor(status, colorScheme);

  const borderColor =
    colorScheme === "dark" ? Colors.dark.tint : Colors.light.secondary;

  const selectedSize = size;
  const iconSize = selectedSize === "sm" ? 42 : 64;
  const containerStyle =
    selectedSize === "sm" ? styles.containerSm : styles.container;
  const iconStyle = selectedSize === "sm" ? styles.iconSm : styles.icon;
  const titleType = selectedSize === "sm" ? "default" : "title";
  const subtitleType = selectedSize === "sm" ? "default" : "subtitle";
  const iconContainerStyle =
    selectedSize === "sm" ? styles.iconContainerSm : styles.iconContainer;
  const titleStyle = selectedSize === "sm" ? true : false;
  const wrapperStyle = isSelected
    ? selectedSize === "lg"
      ? [styles.selectedWrapperLg, { borderColor: borderColor }]
      : [styles.selectedWrapper, { borderColor: borderColor }]
    : selectedSize === "lg"
      ? styles.defaultWrapperLg
      : styles.defaultWrapper;

  return (
    <View style={wrapperStyle}>
      <ThemedView
        style={containerStyle}
        lightColor={backgroundColor}
        darkColor={backgroundColor}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        >
          <ThemedText
            style={titleStyle ? { fontWeight: "bold", fontSize: 18 } : {}}
            type={titleType}
            lightColor={textColor}
            darkColor={textColor}
          >
            Nuvarande {type}
          </ThemedText>
          <View style={iconContainerStyle}>
            <Fontisto
              name={icon}
              size={iconSize}
              style={iconStyle}
              color={textColor}
            />
            <View>
              <ThemedText
                style={titleStyle ? { fontWeight: "bold" } : {}}
                type={subtitleType}
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
    </View>
  );
};
const styles = StyleSheet.create({
  selectedWrapper: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 2,
    marginBottom: 22,
  },
  selectedWrapperLg: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 2,
    marginBottom: 22,
    width: "100%",
  },
  defaultWrapper: {
    padding: 2,
    marginBottom: 24,
  },
  defaultWrapperLg: {
    padding: 2,
    marginBottom: 24,
    width: "100%",
  },
  container: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 10,
    width: "100%",
    height: 170,
  },
  containerSm: {
    marginBottom: 24,
    padding: 12,
    borderRadius: 8,
    width: "auto",
    minWidth: 150,
    height: 170,
  },
  pressable: {
    flex: 1,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  icon: {
    marginBottom: 16,
    marginTop: 16,
  },
  iconSm: {
    marginBottom: 8,
    marginTop: 8,
  },
  iconContainerSm: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
});

export default SensorIndicator;
