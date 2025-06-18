import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import ThemedView from "@/components/ThemedView";
import { useAuthContext } from "@/context/auth/useAuthContext";
import ThemedText from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showTestUserModal, setShowTestUserModal] = useState(false);
  const { text, button, tabBarBackground, background } = useColorScheme();
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

  const fillTestUserCredentials = () => {
    setEmail("test@gmail.com");
    setPassword("test");
    setShowTestUserModal(false);
    setError("");
  };

  return (
    <ThemedView style={styles.overlay}>
      <ThemedView
        lightColor={tabBarBackground}
        darkColor={tabBarBackground}
        style={styles.container}
        accessible
        accessibilityLabel="Inloggningsformular"
      >
        <ThemedView
          style={styles.headerContainer}
          lightColor={tabBarBackground}
          darkColor={tabBarBackground}
        >
          <ThemedText
            type="title"
            darkColor={text}
            lightColor={text}
            style={styles.label}
            accessibilityLabel="header"
          >
            Logga in
          </ThemedText>

          <TouchableOpacity
            onPress={() => setShowTestUserModal(true)}
            style={styles.infoIcon}
            accessibilityLabel="Test user information"
            accessibilityHint="Shows test user credentials"
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={text}
            />
          </TouchableOpacity>
        </ThemedView>

        <TextInput
        testID="email-input"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
          style={[styles.input, { borderColor: text, color: text }]}
          placeholder="Skriv in din e-post"
          placeholderTextColor={text}
          accessibilityLabel="E-post"
          accessibilityHint="Fält där du kan skriva in din e-post"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput
        testID="password-input"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          style={[styles.input, { borderColor: text, color: text }]}
          placeholder="Skriv in ditt lösenord"
          placeholderTextColor={text}
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
            { backgroundColor: button },
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={isLoading ? "Loggar in..." : "Logga in knapp"}
          accessibilityHint="Tryck här för att logga in med det angivna namnet"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={text} />
          ) : (
            <ThemedText>Logga in</ThemedText>
          )}
        </Pressable>
      </ThemedView>

      {/* Test User Info Modal */}
      <Modal
        visible={showTestUserModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTestUserModal(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView
            style={[styles.modalContent, { backgroundColor: background }]}
          >
            <ThemedView style={styles.modalHeader}>
              <ThemedText
                type="subtitle"
                style={[styles.modalTitle, { color: text }]}
              >
                🧪 Test User Inloggningsuppgifter
              </ThemedText>

              <TouchableOpacity
                onPress={() => setShowTestUserModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={text} />
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.modalBody}>
              <ThemedText style={[styles.modalText, { color: text }]}>
                Anved dessa testanvändaruppgifter för att logga in:
              </ThemedText>

              <ThemedView style={styles.credentialContainer}>
                <ThemedText style={[styles.credentialLabel, { color: text }]}>
                  📧 Email:
                </ThemedText>
                <ThemedText style={[styles.credentialValue, { color: text }]}>
                  test@gmail.com
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.credentialContainer}>
                <ThemedText style={[styles.credentialLabel, { color: text }]}>
                  🔒 Password:
                </ThemedText>
                <ThemedText style={[styles.credentialValue, { color: text }]}>
                  test
                </ThemedText>
              </ThemedView>

              <TouchableOpacity
                onPress={fillTestUserCredentials}
                style={[styles.fillButton, { backgroundColor: button }]}
              >
                <ThemedText style={styles.fillButtonText}>
                  Autofyll Testanvändare
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  label: {
    textAlign: "center",
    flex: 1,
  },
  infoIcon: {
    position: "absolute",
    right: 0,
    padding: 5,
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
    color: Colors.dark.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    gap: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  credentialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
  },
  credentialLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  credentialValue: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  fillButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  fillButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
