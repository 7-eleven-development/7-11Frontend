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
          icon={pulseData.icon}
          value={pulseData.value}
          label={pulseData.label}
          type={PULSE_CONFIG.type}
          valueLabel={PULSE_CONFIG.unit}
          status={status}
        />
        <ThemedLineChart
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          title={PULSE_CONFIG.title}
          unit={PULSE_CONFIG.unit}
          colorScheme={colorScheme}
          valueKey="pulse"
          dangerThreshold={PULSE_CONFIG.dangerThreshold}
          maxValue={PULSE_CONFIG.maxValue}
        />
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, alignItems: "center" },
});

export default Pulse;
