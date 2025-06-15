import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedView from "@/components/ThemedView";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";
import usePulseContext from "@/context/Pulse/usePulseContext";
import SensorIndicator from "@/components/SensosrIndicator";
import ThemedLineChart from "@/components/Charts/ThemedLineChart";
import { PULSE_CONFIG } from "@/utils/config/sensorConfigs";
import { getPulseIndicatorStatus } from "@/utils/pulseUtils";

const Pulse = () => {
  const { pulseData, isLoading, error, weeklyData, monthlyData, refreshData } =
    usePulseContext();
  const { colorScheme, text } = useColorScheme();
  const { refreshing, handleRefresh } = useRefresh(refreshData);

  const status = getPulseIndicatorStatus(pulseData.value);

  if (isLoading && !refreshing) {
    return (
      <RefreshView
        refreshing={refreshing}
        onRefresh={handleRefresh}
        accessibilityLabel="Laddar pulsdata"
        accessibilityHint="Dra nedåt för att uppdatera"
      >
        <ThemedView
          style={styles.container}
          accessible={true}
          accessibilityLabel="Laddar pulsdata"
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
        accessibilityLabel="Fel vid hämtning av pulsdata"
        accessibilityHint="Dra nedåt för att försöka igen"
      >
        <ThemedView
          style={styles.container}
          accessible={true}
          accessibilityLabel="Fel vid hämtning av pulsdata"
          accessibilityRole="alert"
        >
          <ErrorMessage
            colorScheme={colorScheme}
            accessibilityLabel="Fel vid hämtning av pulsdata"
          />
        </ThemedView>
      </RefreshView>
    );
  }

  return (
    <RefreshView
      refreshing={refreshing}
      onRefresh={handleRefresh}
      accessibilityLabel="Pulsskärm"
      accessibilityHint="Dra nedåt för att uppdatera pulsdata"
    >
      <ThemedView
        style={styles.container}
        accessible={true}
        accessibilityLabel={`Pulsskärm, aktuell puls: ${pulseData.value} ${PULSE_CONFIG.unit}`}
        accessibilityRole="none"
      >
        <SensorIndicator
          icon={pulseData.icon}
          value={pulseData.value}
          label={pulseData.label}
          type={PULSE_CONFIG.type}
          valueLabel={PULSE_CONFIG.unit}
          status={status}
          accessibilityLabel={`Puls: ${pulseData.value} ${PULSE_CONFIG.unit}, status: ${status}`}
          accessibilityHint="Visar aktuell pulsmätning"
        />
        <ThemedLineChart
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          title={PULSE_CONFIG.title}
          unit={PULSE_CONFIG.unit}
          valueKey="pulse"
          dangerThreshold={PULSE_CONFIG.dangerThreshold}
          maxValue={PULSE_CONFIG.maxValue}
          accessibilityLabel="Pulsdiagram"
          accessibilityHint="Visar historisk pulsdata i diagram"
        />
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, alignItems: "center" },
});

export default Pulse;
