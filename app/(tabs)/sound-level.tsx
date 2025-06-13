import { StyleSheet, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
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
  const { colorScheme, text } = useColorScheme();

  const { icon, value, label } = soundLevelData;

  const { refreshing, handleRefresh } = useRefresh(refreshData);
  const status = getCardStatus("soundLevel", {
    soundLevel: soundLevelData.value,
  });

  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <ThemedView style={styles.container}>
        {isLoading && !refreshing ? (
          <LoadingSpinner color={text} />
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
});

export default SoundLevel;
