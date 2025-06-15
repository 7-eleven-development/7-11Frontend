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
      <RefreshView
        refreshing={refreshing}
        onRefresh={handleRefresh}
        accessibilityLabel="Laddar ljudnivådata"
        accessibilityHint="Dra nedåt för att uppdatera"
      >
        <ThemedView
          style={styles.container}
          accessible={true}
          accessibilityLabel="Laddar ljudnivådata"
          accessibilityRole="none"
        >
          <LoadingSpinner color={text} />
        </ThemedView>
      </RefreshView>
    );
  }

  if (error) {
    return (
      <RefreshView
        refreshing={refreshing}
        onRefresh={handleRefresh}
        accessibilityLabel="Fel vid hämtning av ljudnivådata"
        accessibilityHint="Dra nedåt för att försöka igen"
      >
        <ThemedView
          style={styles.container}
          accessible={true}
          accessibilityLabel="Fel vid hämtning av ljudnivådata"
          accessibilityRole="alert"
        >
          <ErrorMessage
            colorScheme={colorScheme}
            accessibilityLabel="Fel vid hämtning av ljudnivådata"
          />
        </ThemedView>
      </RefreshView>
    );
  }

  return (
    <RefreshView
      refreshing={refreshing}
      onRefresh={handleRefresh}
      accessibilityLabel="Ljudnivåskärm"
      accessibilityHint="Dra nedåt för att uppdatera ljudnivådata"
    >
      <ThemedView
        style={styles.container}
        accessible={true}
        accessibilityLabel={`Ljudnivåskärm, aktuell ljudnivå: ${soundLevelData.value} ${SOUND_LEVEL_CONFIG.unit}`}
        accessibilityRole="none"
      >
        <SensorIndicator
          icon={soundLevelData.icon}
          value={soundLevelData.value}
          label={soundLevelData.label}
          type={SOUND_LEVEL_CONFIG.type}
          valueLabel={SOUND_LEVEL_CONFIG.unit}
          status={status}
          accessibilityLabel={`Ljudnivå: ${soundLevelData.value} ${SOUND_LEVEL_CONFIG.unit}, status: ${status}`}
          accessibilityHint="Visar aktuell ljudnivåmätning"
        />
        <ThemedLineChart
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          title={SOUND_LEVEL_CONFIG.title}
          unit={SOUND_LEVEL_CONFIG.unit}
          valueKey="sound"
          dangerThreshold={SOUND_LEVEL_CONFIG.dangerThreshold}
          maxValue={SOUND_LEVEL_CONFIG.maxValue}
          accessibilityLabel="Ljudnivådiagram"
          accessibilityHint="Visar historisk ljudnivådata i diagram"
        />
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, alignItems: "center" },
});

export default SoundLevel;
