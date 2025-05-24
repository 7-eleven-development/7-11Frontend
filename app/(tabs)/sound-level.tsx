import { StyleSheet, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import useSoundLevelContext from "@/context/SoundLevel/useSoundLevelContext";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";
import ThemedLineChart from "@/components/Charts/ThemedLineChart";
import SensorIndicator from "@/components/SensosrIndicator";
import { getCardStatus } from "@/utils/cardUtils";

const SoundLevel = () => {
  const {
    soundLevelData,
    weeklyData,
    monthlyData,
    isLoading,
    error,
    refreshData,
  } = useSoundLevelContext();
  const colorScheme = useColorScheme();

  const { icon, value, label } = soundLevelData;
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  const { refreshing, handleRefresh } = useRefresh(refreshData);
  const status = getCardStatus("soundLevel", {
    soundLevel: soundLevelData.value,
  });

  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <ThemedView style={styles.container}>
        {isLoading && !refreshing ? (
          <LoadingSpinner color={textColor} />
        ) : error ? (
          <ErrorMessage colorScheme={colorScheme} />
        ) : (
          <>
            <SensorIndicator
              icon={icon}
              value={value}
              label={label}
              type="ljudnivå"
              valueLabel="dB"
              status={status}
            />
            <ThemedLineChart
              weeklyData={weeklyData}
              monthlyData={monthlyData}
              title="Ljudnivå"
              unit="dB"
              colorScheme={colorScheme}
              valueKey="sound"
              dangerThreshold={100}
              maxValue={120}
            />
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
    paddingTop: 40,
    alignItems: "center",
  },
  icon: {
    marginBottom: 16,
    marginTop: 16,
  },
  sensorSection: {
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(200, 200, 200, 0.1)",
  },
});

export default SoundLevel;
