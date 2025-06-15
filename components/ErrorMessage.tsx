import { Colors, ColorScheme, ColorSchemeName } from "@/theme/Colors";
import { AntDesign } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import { StyleSheet } from "react-native";
import ThemedView from "./ThemedView";

const ErrorMessage = ({ 
  colorScheme,
  accessibilityLabel 
}: { 
  colorScheme: ColorSchemeName;
  accessibilityLabel?: string;
}) => {
  const scheme = (colorScheme ?? "light") as ColorScheme;

  return (
    <ThemedView 
      style={styles.containter}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel={accessibilityLabel || "Ett fel uppstod. Försök igen senare."}
    >
      <AntDesign
        name="exclamationcircleo"
        size={64}
        style={styles.icon}
        color={Colors[scheme].error}
        accessibilityLabel="Felikon"
      />
      <ThemedText
        lightColor={Colors[scheme].text}
        darkColor={Colors[scheme].textColorLight}
        type="subtitle"
        accessible={true}
        accessibilityRole="text"
      >
        Ett fel uppstod. Försök igen senare.
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default ErrorMessage;
