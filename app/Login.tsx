import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ThemedView from "@/components/ThemedView";
import { useThemeColor } from "@/theme/useThemeColors";
import { useAuthContext } from "@/context/auth/useAuthContext";
import ThemedText from "@/components/ThemedText";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const buttonColor = useThemeColor({}, "button");
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

  return (
    <ThemedView style={styles.overlay}>
      <ThemedView
        style={styles.container}
        accessible
        accessibilityLabel="Inloggningsformular"
      >
        <ThemedText style={styles.label} accessibilityLabel="header">
          Logga in
        </ThemedText>

        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          style={styles.input}
          placeholder="Skriv in ditt användarnamn"
          placeholderTextColor="#888"
          accessibilityLabel="Användarnamn"
          accessibilityHint="Fält där du kan skriva in ditt användarnamn"
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
          style={styles.input}
          placeholder="Skriv in ditt lösenord"
          placeholderTextColor="#888"
          accessibilityLabel="Lösenord"
          accessibilityHint="Fält där du kan skriva in ditt lösenord"
          secureTextEntry={true}
          returnKeyType="done"
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
            <ActivityIndicator size="small" color="#fff" />
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
    fontSize: 24,
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
