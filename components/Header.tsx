import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import { View, Pressable, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Header = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;
  const backgroundColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.background;
  const iconColor =
    colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

  return (
    <ThemedView
      style={styles.container}
      lightColor={backgroundColor}
      darkColor={backgroundColor}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Pressable onPress={() => router.push("/location")}>
          <ThemedText type="title" lightColor={textColor} darkColor={textColor}>
            Malmö
          </ThemedText>
        </Pressable>
        <ThemedText lightColor={textColor} darkColor={textColor}>
          16°C
        </ThemedText>
      </View>
      <Pressable onPress={() => router.push("/user")}>
        <AntDesign name="user" size={24} color={iconColor} />
      </Pressable>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
export default Header;
