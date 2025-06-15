import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedView from "./ThemedView";

interface UserHeaderProps {
  headerBackgroundColor: string;
  tint: string;
  onBackPress: () => void;
  onThemeToggle: () => void;
  themeIcon: keyof typeof Ionicons.glyphMap;
  themeIconColor: string;
}

const UserHeader = ({
  headerBackgroundColor,
  tint,
  onBackPress,
  onThemeToggle,
  themeIcon,
  themeIconColor,
}: UserHeaderProps) => {
  return (
    <ThemedView
      style={styles.headerContainer}
      lightColor={headerBackgroundColor}
      darkColor={headerBackgroundColor}
      accessible={true}
      accessibilityRole="header"
      accessibilityLabel="Användarinställningar"
    >
      <Pressable
        onPress={onBackPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Tillbaka"
        accessibilityHint="Tryck för att gå tillbaka till startsidan"
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={tint}
          accessibilityLabel="Tillbaka ikon"
        />
      </Pressable>

      <Pressable
        onPress={onThemeToggle}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Växla tema"
        accessibilityHint="Tryck för att växla mellan ljust och mörkt tema"
      >
        <Ionicons
          name={themeIcon}
          size={24}
          color={themeIconColor}
          accessibilityLabel="Tema ikon"
        />
      </Pressable>
    </ThemedView>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
