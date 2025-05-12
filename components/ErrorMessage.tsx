import { Colors, ColorScheme, ColorSchemeName } from "@/theme/Colors";
import { AntDesign } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import { StyleSheet } from "react-native";

const ErrorMessage = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const scheme = (colorScheme ?? "light") as ColorScheme;

  return (
    <>
      <AntDesign
        name="exclamationcircleo"
        size={64}
        style={styles.icon}
        color={Colors[scheme].error}
      />
      <ThemedText
        lightColor={Colors[scheme].text}
        darkColor={Colors[scheme].textColorLight}
        type="subtitle"
      >
        Error loading data
      </ThemedText>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default ErrorMessage;
