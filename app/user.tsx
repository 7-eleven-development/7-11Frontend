import { StyleSheet, Pressable, Button, TouchableOpacity } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import useUserContext from "@/context/user/useUserContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/Colors";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

const User = () => {
  const { theme, toggleTheme, actualTheme, user } = useUserContext();
  const router = useRouter();

  const { logout } = useAuthContext();
  const handleLogout = async () => {
    logout();
    router.push("/Login");
  };

  const goBackToIndex = () => {
    router.push("/(tabs)");
  };

  const colorSheme = useColorScheme();
  const backgroundColor =
    colorSheme === "dark"
      ? Colors.dark.background
      : Colors.light.tabBarBackground;
  const textColor =
    colorSheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  const getThemeIcon = () => {
    if (theme === "system") return "phone-portrait";
    return actualTheme === "dark" ? "sunny" : "moon";
  };

  const getThemeIconColor = () => {
    if (theme === "system") return textColor;
    return actualTheme === "dark" ? "yellow" : textColor;
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Pressable onPress={toggleTheme} style={styles.header}>
        <Ionicons name={getThemeIcon()} size={24} color={getThemeIconColor()} />
      </Pressable>

      <Pressable onPress={goBackToIndex} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </Pressable>

      {user && (
        <>
          <ThemedText style={[styles.info, { color: textColor }]}>
            Användare inloggad
          </ThemedText>

          <ThemedText style={[styles.info, { color: textColor }]}>
            👤Namn: {user.firstname} {user.surname}
          </ThemedText>

          <ThemedText style={[styles.info, { color: textColor }]}>
            📧 E-post: {user.email}
          </ThemedText>

          <ThemedText style={[styles.info, { color: textColor }]}>
            📞Telefon: {user.phonenumber}
          </ThemedText>

          <ThemedText style={[styles.info, { color: textColor }]}>
            🏢Företag: {user.company_name}
          </ThemedText>

          <ThemedText style={[styles.info, { color: textColor }]}>
            🎨Tema:{" "}
            {theme === "system"
              ? "System"
              : theme === "light"
                ? "Ljust"
                : "Mörkt"}
          </ThemedText>
        </>
      )}

      <TouchableOpacity
        onPress={handleLogout}
        style={[
          styles.logoutButton,
          { backgroundColor: Colors[actualTheme].tint },
        ]}
      >
        <ThemedText style={styles.logoutButtonText}> Logga ut </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },

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
