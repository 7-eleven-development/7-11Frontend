import { StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";
import usePulseContext from "@/context/Pulse/usePulseContext";
import SensorIndicator from "@/components/SensosrIndicator";
import { getCardStatus } from "@/utils/cardUtils";
import ThemedLineChart from "@/components/Charts/ThemedLineChart";

const Pulse = () => {
  const { pulseData, isLoading, error, weeklyData, monthlyData, refreshData } =
    usePulseContext();
  const colorScheme = useColorScheme();

  const { icon, value, label } = pulseData;
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;

  const { refreshing, handleRefresh } = useRefresh(refreshData);
  const status = getCardStatus("pulse", { pulse: pulseData.value });
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
              type="puls"
              valueLabel="BPM"
              status={status}
            />
            <ThemedLineChart
              weeklyData={weeklyData}
              monthlyData={monthlyData}
              title="Puls"
              unit="BPM"
              colorScheme={colorScheme}
              valueKey="pulse"
              dangerThreshold={100}
              maxValue={200}
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

export default Pulse;
