import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ThemedView from "@/components/ThemedView";
import { useAuthContext } from "@/context/auth/useAuthContext";
import ThemedText from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const colorScheme = useColorScheme();
  const { login, isLoading } = useAuthContext();

  const handleSubmit = async () => {
    if (!email) {
      setError("Något gick fel. Ange din e-post.");
      return;
    } else if (!password) {
      setError("Lösenord saknas.");
      return;
    }

    setError("");
    const result = await login({ email, password });
    if (!result.success) {
      setError(result.error || "Inloggningen misslyckades. Försök igen.");
    }
  };

  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;
  const buttonColor =
    colorScheme === "dark" ? Colors.dark.button : Colors.light.button;
  const backgroundColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.tabBarBackground;
  const inputBorderColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;
  const inputTextColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  return (
    <ThemedView style={styles.overlay}>
      <ThemedView
        lightColor={backgroundColor}
        darkColor={backgroundColor}
        style={styles.container}
        accessible
        accessibilityLabel="Inloggningsformular"
      >
        <ThemedText
          type="title"
          darkColor={textColor}
          lightColor={textColor}
          style={styles.label}
          accessibilityLabel="header"
        >
          Logga in
        </ThemedText>

        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          style={[
            styles.input,
            { borderColor: inputBorderColor, color: inputTextColor },
          ]}
          placeholder="Skriv in din e-post"
          placeholderTextColor={textColor}
          accessibilityLabel="E-post"
          accessibilityHint="Fält där du kan skriva in din e-post"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          style={[
            styles.input,
            { borderColor: inputBorderColor, color: inputTextColor },
          ]}
          placeholder="Skriv in ditt lösenord"
          placeholderTextColor={textColor}
          accessibilityLabel="Lösenord"
          accessibilityHint="Fält där du kan skriva in ditt lösenord"
          secureTextEntry={true}
          returnKeyType="done"
          autoCapitalize="none"
        />

        {error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : null}

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: buttonColor },
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={isLoading ? "Loggar in..." : "Logga in knapp"}
          accessibilityHint="Tryck här för att logga in med det angivna namnet"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={textColor} />
          ) : (
            <ThemedText>Logga in</ThemedText>
          )}
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  errorText: {
    marginBottom: 10,
  },
});
