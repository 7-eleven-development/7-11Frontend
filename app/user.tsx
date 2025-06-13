import { StyleSheet, Pressable } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import useUserContext from "@/context/user/useUserContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/Colors";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import UpdateButton from "@/components/UpdateButton";

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

  const { colorScheme, text, tint } = useColorScheme();
  const backgroundColor =
    colorScheme === "dark"
      ? Colors.dark.background
      : Colors.light.tabBarBackground;

  const headerBackgroundColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.background;

  const getThemeIcon = () => {
    if (theme === "system") return "phone-portrait";
    return actualTheme === "dark" ? "sunny" : "moon";
  };

  const getThemeIconColor = () => {
    if (theme === "system") return text;
    return actualTheme === "dark" ? "yellow" : text;
  };

  return (
    <>
      <ThemedView
        style={styles.headerContainer}
        lightColor={headerBackgroundColor}
        darkColor={headerBackgroundColor}
      >
        <Pressable onPress={goBackToIndex}>
          <Ionicons name="arrow-back" size={24} color={tint} />
        </Pressable>
        <Pressable onPress={toggleTheme}>
          <Ionicons
            name={getThemeIcon()}
            size={24}
            color={getThemeIconColor()}
          />
        </Pressable>
      </ThemedView>
      <ThemedView style={[styles.container, { backgroundColor }]}>
        {user && (
          <>
            <ThemedText style={[styles.info, { color: text }]}>
              Användare inloggad
            </ThemedText>

            <ThemedText style={[styles.info, { color: text }]}>
              👤Namn: {user.firstname} {user.surname}
            </ThemedText>

            <ThemedText style={[styles.info, { color: text }]}>
              📧 E-post: {user.email}
            </ThemedText>

            <ThemedText style={[styles.info, { color: text }]}>
              📞Telefon: {user.phonenumber}
            </ThemedText>

            <ThemedText style={[styles.info, { color: text }]}>
              🏢Företag: {user.company_name}
            </ThemedText>

            <ThemedText style={[styles.info, { color: text }]}>
              🎨Tema:{" "}
              {theme === "system"
                ? "System"
                : theme === "light"
                  ? "Ljust"
                  : "Mörkt"}
            </ThemedText>
            <UpdateButton />
          </>
        )}

        <Pressable
          onPress={handleLogout}
          style={[
            styles.logoutButton,
            { backgroundColor: Colors[actualTheme].tint },
          ]}
        >
          <ThemedText style={styles.logoutButtonText}> Logga ut </ThemedText>
        </Pressable>
      </ThemedView>
    </>
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

  info: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "center",
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
