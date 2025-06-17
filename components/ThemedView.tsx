import { View, type ViewProps } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

const ThemedView = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) => {
  const { background, colorScheme } = useColorScheme();

  const backgroundColor =
    lightColor || darkColor
      ? (colorScheme === "dark" ? darkColor : lightColor) || background
      : background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default ThemedView;
