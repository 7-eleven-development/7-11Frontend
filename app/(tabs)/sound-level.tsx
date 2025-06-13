import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedView from "@/components/ThemedView";
import useSoundLevelContext from "@/context/SoundLevel/useSoundLevelContext";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";
import ThemedLineChart from "@/components/Charts/ThemedLineChart";
import SensorIndicator from "@/components/SensosrIndicator";
import { SOUND_LEVEL_CONFIG } from "@/utils/config/sensorConfigs";
import { getSoundLevelIndicatorStatus } from "@/utils/soundLevelUtils";

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
  const { refreshing, handleRefresh } = useRefresh(refreshData);

  const status = getSoundLevelIndicatorStatus(soundLevelData.value);

  if (isLoading && !refreshing) {
    return (
      <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
        <ThemedView style={styles.container}>
          <LoadingSpinner color={text} />
        </ThemedView>
      </RefreshView>
    );
  }

  if (error) {
    return (
      <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
        <ThemedView style={styles.container}>
          <ErrorMessage colorScheme={colorScheme} />
        </ThemedView>
      </RefreshView>
    );
  }

  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <ThemedView style={styles.container}>
        <SensorIndicator
          icon={soundLevelData.icon}
          value={soundLevelData.value}
          label={soundLevelData.label}
          type={SOUND_LEVEL_CONFIG.type}
          valueLabel={SOUND_LEVEL_CONFIG.unit}
          status={status}
        />
        <ThemedLineChart
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          title={SOUND_LEVEL_CONFIG.title}
          unit={SOUND_LEVEL_CONFIG.unit}
          colorScheme={colorScheme}
          valueKey="sound"
          dangerThreshold={SOUND_LEVEL_CONFIG.dangerThreshold}
          maxValue={SOUND_LEVEL_CONFIG.maxValue}
        />
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, alignItems: "center" },
});

export default SoundLevel;
