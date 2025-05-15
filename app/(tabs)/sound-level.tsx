import { StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import useSoundLevelContext from "@/context/SoundLevel/useSoundLevelContext";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";

const SoundLevel = () => {
  const { soundLevelData, isLoading, error, refreshData } =
    useSoundLevelContext();
  const colorScheme = useColorScheme();

  const { icon, value, label } = soundLevelData;
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  const { refreshing, handleRefresh } = useRefresh(refreshData);

  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <ThemedView style={styles.container}>
        {isLoading && !refreshing ? (
          <LoadingSpinner color={textColor} />
        ) : error ? (
          <ErrorMessage colorScheme={colorScheme} />
        ) : (
          <>
            <ThemedText
              type="title"
              lightColor={textColor}
              darkColor={textColor}
            >
              Sound Level
            </ThemedText>
            <Fontisto
              name={icon}
              size={64}
              style={styles.icon}
              color={textColor}
            />
            <ThemedText
              type="subtitle"
              lightColor={textColor}
              darkColor={textColor}
            >
              {value} dB
            </ThemedText>
            <ThemedText lightColor={textColor} darkColor={textColor}>
              {label}
            </ThemedText>
          </>
        )}
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 16,
    marginTop: 16,
  },
});

export default SoundLevel;
