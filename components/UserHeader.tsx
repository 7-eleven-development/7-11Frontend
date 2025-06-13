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
    >
      <Pressable onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={tint} />
      </Pressable>
      <Pressable onPress={onThemeToggle}>
        <Ionicons name={themeIcon} size={24} color={themeIconColor} />
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
