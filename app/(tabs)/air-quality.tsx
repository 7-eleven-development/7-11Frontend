import { ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedView from "@/components/ThemedView";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";
import { useContext, useState } from "react";
import { AirQualityContext } from "@/context/airQuality/AirQualityContext";
import SensorIndicator from "@/components/SensosrIndicator";
import { getCardStatus } from "@/utils/cardUtils";
import ThemedLineChart from "@/components/Charts/ThemedLineChart";

type SensorType = "co2" | "propane" | "smoke";

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
  } = useContext(AirQualityContext);

  const [selectedSensor, setSelectedSensor] = useState<SensorType>("co2");

  const { colorScheme, text } = useColorScheme();
  const {
    co2: currentCO2,
    propane: currentPropane,
    smoke: currentSmoke,
  } = currentValues;

  const { refreshing, handleRefresh } = useRefresh(refreshData);
  const Co2statusColor = getCardStatus("airQuality", {
    co2: currentCO2,
  });
  const SmokeStatusColor = getCardStatus("airQuality", {
    smoke: currentSmoke,
  });
  const PropanestatusColor = getCardStatus("airQuality", {
    propane: currentPropane,
  });

  // Get chart data based on selected sensor
  const getChartData = () => {
    switch (selectedSensor) {
      case "co2":
        return {
          weeklyData: co2WeeklyData,
          monthlyData: co2MonthlyData,
          title: "CO2 Nivåer",
          unit: "ppm",
          valueKey: "co2",
          dangerThreshold: 1000,
          maxValue: 2000,
        };
      case "propane":
        return {
          weeklyData: propaneWeeklyData,
          monthlyData: propaneMonthlyData,
          title: "Propan Nivåer",
          unit: "ppm",
          valueKey: "propane",
          dangerThreshold: 500,
          maxValue: 1000,
        };
      case "smoke":
        return {
          weeklyData: smokeWeeklyData,
          monthlyData: smokeMonthlyData,
          title: "Rök Nivåer",
          unit: "ppm",
          valueKey: "smoke",
          dangerThreshold: 150,
          maxValue: 300,
        };
      default:
        return {
          weeklyData: co2WeeklyData,
          monthlyData: co2MonthlyData,
          title: "CO2 Nivåer",
          unit: "ppm",
          valueKey: "co2",
          dangerThreshold: 1000,
          maxValue: 2000,
        };
    }
  };

  const chartData = getChartData();

  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <ThemedView style={styles.container}>
        {isLoading && !refreshing ? (
          <LoadingSpinner color={text} />
        ) : error ? (
          <ErrorMessage colorScheme={colorScheme} />
        ) : (
          <>
            <ScrollView
              horizontal
              style={styles.sensorsScrollView}
              contentContainerStyle={styles.sensorsScrollContent}
              showsHorizontalScrollIndicator={false}
            >
              <SensorIndicator
                icon={CO2Status.icon}
                value={currentCO2}
                label={CO2Status.label}
                type="CO2"
                valueLabel="ppm"
                status={Co2statusColor}
                size="sm"
                isSelected={selectedSensor === "co2"}
                onPress={() => setSelectedSensor("co2")}
              />
              <SensorIndicator
                icon={PropaneStatus.icon}
                value={currentPropane}
                label={PropaneStatus.label}
                type="propan"
                valueLabel="ppm"
                status={PropanestatusColor}
                size="sm"
                isSelected={selectedSensor === "propane"}
                onPress={() => setSelectedSensor("propane")}
              />
              <SensorIndicator
                icon={SmokeStatus.icon}
                value={currentSmoke}
                label={SmokeStatus.label}
                type="rök"
                valueLabel="ppm"
                status={SmokeStatusColor}
                size="sm"
                isSelected={selectedSensor === "smoke"}
                onPress={() => setSelectedSensor("smoke")}
              />
            </ScrollView>
            <ThemedLineChart
              key={selectedSensor}
              weeklyData={chartData.weeklyData}
              monthlyData={chartData.monthlyData}
              title={chartData.title}
              unit={chartData.unit}
              colorScheme={colorScheme}
              valueKey={chartData.valueKey}
              dangerThreshold={chartData.dangerThreshold}
              maxValue={chartData.maxValue}
            />
          </>
        )}
      </ThemedView>
    </RefreshView>
  );
};

// ...existing styles...
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
