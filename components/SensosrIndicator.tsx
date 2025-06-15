import { Pressable, StyleSheet, View, AccessibilityRole } from "react-native";
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
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
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
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
}: SeensorIndicatorProps) => {
  const { colorScheme, text } = useColorScheme();
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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "good":
        return "bra";
      case "bad":
        return "dålig";
      case "normal":
        return "normal";
      default:
        return status;
    }
  };

  const defaultAccessibilityLabel = `${type}: ${value} ${valueLabel}, status: ${getStatusDescription(status)}${isSelected ? ", vald" : ""}`;

  return (
    <View
      style={wrapperStyle}
      accessible={true}
      accessibilityLabel={isSelected ? `${type}sensor, vald` : `${type}sensor`}
      accessibilityRole="none"
    >
      <ThemedView
        style={containerStyle}
        lightColor={backgroundColor}
        darkColor={backgroundColor}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
          accessible={true}
          accessibilityRole={onPress ? accessibilityRole : "text"}
          accessibilityLabel={accessibilityLabel || defaultAccessibilityLabel}
          accessibilityHint={
            accessibilityHint ||
            (onPress ? `Tryck för att välja ${type}sensor` : undefined)
          }
          accessibilityState={{
            disabled: !onPress,
            selected: isSelected,
          }}
        >
          <ThemedText
            style={titleStyle ? { fontWeight: "bold", fontSize: 18 } : {}}
            type={titleType}
            lightColor={text}
            darkColor={text}
            accessible={true}
            accessibilityRole="header"
            accessibilityLabel={`Nuvarande ${type}`}
          >
            Nuvarande {type}
          </ThemedText>
          <View
            style={iconContainerStyle}
            accessible={true}
            accessibilityLabel="Sensordata"
            accessibilityRole="none"
          >
            <Fontisto
              name={icon}
              size={iconSize}
              style={iconStyle}
              color={text}
              accessibilityLabel={`${type}ikon`}
            />
            <View
              accessible={true}
              accessibilityLabel={`Värde: ${value} ${valueLabel}, ${label}`}
              accessibilityRole="text"
            >
              <ThemedText
                style={titleStyle ? { fontWeight: "bold" } : {}}
                type={subtitleType}
                lightColor={text}
                darkColor={text}
                accessible={false}
              >
                {value} {valueLabel}
              </ThemedText>
              <ThemedText lightColor={text} darkColor={text} accessible={false}>
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
