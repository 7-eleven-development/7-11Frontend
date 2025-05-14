import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/theme/useThemeColors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle";
};

const ThemedText = ({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Roboto",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 42,
    fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default ThemedText;
