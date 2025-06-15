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
      accessible={true}
      accessibilityRole="header"
      accessibilityLabel={`Platsinformation: ${locationName}, ${temperature} grader Celsius`}
    >
      <View 
        style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
        accessible={true}
        accessibilityLabel="Plats och temperaturinformation"
      >
        <Pressable 
          onPress={() => router.push("/location")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Plats: ${locationName}`}
          accessibilityHint="Tryck för att visa plats på karta"
        >
          <ThemedText 
            type="title" 
            lightColor={text} 
            darkColor={text}
            accessible={true}
            accessibilityRole="text"
          >
            {locationName}
          </ThemedText>
        </Pressable>
        <ThemedText 
          lightColor={text} 
          darkColor={text}
          accessible={true}
          accessibilityLabel={`Temperatur: ${temperature} grader Celsius`}
          accessibilityRole="text"
        >
          {temperature}°C
        </ThemedText>
      </View>
      <Pressable 
        onPress={() => router.push("/user")}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Användarprofil"
        accessibilityHint="Tryck för att öppna användarinställningar"
      >
        <AntDesign 
          name="user" 
          size={24} 
          color={icon}
          accessibilityLabel="Användarikon"
        />
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