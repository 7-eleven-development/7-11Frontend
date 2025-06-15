import { Pressable, StyleSheet } from "react-native";
import ThemedText from "./ThemedText";
import { Colors } from "@/theme/Colors";

interface LogoutButtonProps {
  onPress: () => void;
  actualTheme: "dark" | "light";
}

const LogoutButton = ({ onPress, actualTheme }: LogoutButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.logoutButton,
        { backgroundColor: Colors[actualTheme].tint },
      ]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Logga ut"
      accessibilityHint="Tryck för att logga ut från appen"
    >
      <ThemedText
        style={styles.logoutButtonText}
        accessible={false} 
      >
        Logga ut
      </ThemedText>
    </Pressable>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
