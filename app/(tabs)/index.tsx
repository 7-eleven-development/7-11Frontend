import { StyleSheet } from "react-native";
import Card from "@/components/Card";
import RefreshView from "@/components/RefreshView";
import ThemedView from "@/components/ThemedView";
import Header from "@/components/Header";
import useHomeContext from "@/context/home/useHomeConext";
import useRefresh from "@/hooks/useRefresh";
import { getCardStatus } from "@/utils/cardUtils";

const Index = () => {
  const { homeData, refreshData } = useHomeContext();
  const { refreshing, handleRefresh } = useRefresh(refreshData);

  const { temperature, location, pulse, soundLevel, airQuality } = homeData;
  const { value: pulseValue } = pulse;
  const { value: soundLevelValue } = soundLevel;

  // Let the utility functions determine the status based on actual values
  const soundLevelData = {
    type: "soundLevel" as const,
    data: { soundLevel: soundLevelValue },
    // Use the utility function to determine status based on actual values
    status: getCardStatus("soundLevel", { soundLevel: soundLevelValue }),
  };

  const pulseData = {
    type: "pulse" as const,
    data: { pulse: pulseValue },
    // Use the utility function to determine status based on actual values
    status: getCardStatus("pulse", { pulse: pulseValue }),
  };

  const airQualityData = {
    type: "airQuality" as const,
    data: {
      propane: airQuality.propane,
      smoke: airQuality.smoke,
      co2: airQuality.co2,
    },
    // Use the utility function to determine status based on actual values
    status: getCardStatus("airQuality", {
      propane: airQuality.propane,
      smoke: airQuality.smoke,
      co2: airQuality.co2,
    }),
  };

  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <Header locationName={location.name} temperature={temperature} />
      <ThemedView style={styles.container}>
        <Card cardData={soundLevelData} />
        <Card cardData={pulseData} />
        <Card cardData={airQualityData} />
      </ThemedView>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default Index;