import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import * as Updates from "expo-updates";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import ThemedText from "./ThemedText";

const UpdateButton = () => {
  const colorScheme = useColorScheme();
  const buttonColor =
    colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

  const handleUpdateCheck = async () => {
    try {
      console.log("Manually checking for updates...");
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        Alert.alert(
          "Update Available",
          "En uppdatering är tillgänglig. Installera nu?",
          [
            { text: "Avbryt", style: "cancel" },
            {
              text: "Uppdatera",
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
            },
          ]
        );
      } else {
        Alert.alert("Inga uppdateringar", "Din app är uppdaterad!");
      }
    } catch (error) {
      console.error("Update check failed:", error);
      Alert.alert("Fel", "Kunde inte kontrollera uppdateringar");
    }
  };

  return (
    <TouchableOpacity
      onPress={handleUpdateCheck}
      style={[styles.button, { backgroundColor: buttonColor }]}
    >
      <ThemedText style={styles.buttonText}>Sök efter uppdateringar</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
});

export default UpdateButton;
