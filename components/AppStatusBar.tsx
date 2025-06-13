import { StatusBar } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";

const AppStatusBar = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.tabBarBackground;

  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      translucent={true}
    />
  );
};

export default AppStatusBar;
