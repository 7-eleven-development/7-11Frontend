import { StatusBar } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";

const AppStatusBar = () => {
  const { colorScheme, tabBarBackground } = useColorScheme();

  return (
    <StatusBar
      backgroundColor={tabBarBackground}
      barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      translucent={true}
    />
  );
};

export default AppStatusBar;
