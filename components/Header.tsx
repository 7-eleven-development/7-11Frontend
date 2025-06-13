import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import { View, Pressable, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  locationName: string;
  temperature: number;
};

const Header = ({ locationName, temperature }: HeaderProps) => {
  const { text, tabBarBackground, icon } = useColorScheme();
  const router = useRouter();

  return (
    <ThemedView
      style={styles.container}
      lightColor={tabBarBackground}
      darkColor={tabBarBackground}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Pressable onPress={() => router.push("/location")}>
          <ThemedText type="title" lightColor={text} darkColor={text}>
            {locationName}
          </ThemedText>
        </Pressable>
        <ThemedText lightColor={text} darkColor={text}>
          {temperature}°C
        </ThemedText>
      </View>
      <Pressable onPress={() => router.push("/user")}>
        <AntDesign name="user" size={24} color={icon} />
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
