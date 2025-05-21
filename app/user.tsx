import { StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { UserContext } from "@/context/userContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/Colors";
import { useThemeColor } from "@/theme/useThemeColors";
import { useRouter } from "expo-router";

const User = () => {
  const { theme, toggleTheme, user } = useContext(UserContext);
  const router = useRouter();

  const goBackToIndex = () => {
    router.push("/(tabs)");
  };

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Pressable onPress={toggleTheme} style={styles.header}>
        <Ionicons
          name={theme === "dark" ? "sunny" : "moon"}
          size={24}
          color={theme === "dark" ? "yellow" : "black"}
        />
      </Pressable>

      <Pressable onPress={goBackToIndex} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </Pressable>

      {user ? (
        <>
          <ThemedText style={[styles.info, { color: textColor }]}>
            Användare inloggad:
          </ThemedText>
          <ThemedText style={[styles.info, { color: textColor }]}>
            Förnamn: {user.firstName}
          </ThemedText>
          <ThemedText style={[styles.info, { color: textColor }]}>
            Efternamn: {user.surname}
          </ThemedText>
          <ThemedText style={[styles.info, { color: textColor }]}>
            E-post: {user.email}
          </ThemedText>
          <ThemedText style={[styles.info, { color: textColor }]}>
            Telefon: {user.phone}
          </ThemedText>
        </>
      ) : (
        <ThemedText style={[styles.info, { color: textColor }]}>
          Ingen användare inloggad.
        </ThemedText>
      )}
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
});
