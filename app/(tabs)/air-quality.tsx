import { StyleSheet } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import useAirQualityContext from "@/context/airQuality/useAirQuality";
import { AIR_QUALITY_SENSORS } from "@/utils/config/sensorConfigs";
import useRefresh from "@/hooks/useRefresh";
import ThemedView from "@/components/ThemedView";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import ThemedLineChart from "@/components/Charts/ThemedLineChart";
import AirQualitySensorList from "@/components/AirQualitySensorList";

const AirQuality = () => {
  const {
    CO2Status,
    PropaneStatus,
    SmokeStatus,
    isLoading,
    error,
    refreshData,
    currentValues,
    co2WeeklyData,
    co2MonthlyData,
    propaneWeeklyData,
    propaneMonthlyData,
    smokeWeeklyData,
    smokeMonthlyData,
  } = useAirQualityContext();
  const [selectedSensor, setSelectedSensor] = useState<
    "co2" | "propane" | "smoke"
  >("co2");
  const { refreshing, handleRefresh } = useRefresh(refreshData);
  const { colorScheme, text } = useColorScheme();

  const sensors = [
    {
      key: "co2" as const,
      value: currentValues.co2,
      status: CO2Status,
      weeklyData: co2WeeklyData,
      monthlyData: co2MonthlyData,
    },
    {
      key: "propane" as const,
      value: currentValues.propane,
      status: PropaneStatus,
      weeklyData: propaneWeeklyData,
      monthlyData: propaneMonthlyData,
    },
    {
      key: "smoke" as const,
      value: currentValues.smoke,
      status: SmokeStatus,
      weeklyData: smokeWeeklyData,
      monthlyData: smokeMonthlyData,
    },
  ];

  const selected = sensors.find((s) => s.key === selectedSensor)!;
  const config = AIR_QUALITY_SENSORS[selectedSensor];

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
        <AirQualitySensorList
          sensors={sensors}
          selectedSensor={selectedSensor}
          onSensorSelect={(sensor) =>
            setSelectedSensor(sensor as "co2" | "propane" | "smoke")
          }
          style={styles.sensorsScrollView}
          contentStyle={styles.sensorsScrollContent}
        />
        <ThemedLineChart
          key={selectedSensor}
          weeklyData={selected.weeklyData}
          monthlyData={selected.monthlyData}
          title={config.title}
          unit={config.unit}
          colorScheme={colorScheme}
          valueKey={config.key}
          dangerThreshold={config.dangerThreshold}
          maxValue={config.maxValue}
        />
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  sensorsScrollView: {
    maxHeight: 200,
    width: "100%",
  },
  sensorsScrollContent: {
    flexDirection: "row",
    gap: 20,
  },
});

export default AirQuality;
