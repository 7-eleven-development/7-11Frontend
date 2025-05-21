import { StyleSheet } from "react-native";
import Card, { CardStatus } from "@/components/Card";
import RefreshView from "@/components/RefreshView";
import ThemedView from "@/components/ThemedView";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import useHomeContext from "@/context/home/useHomeConext";
import useRefresh from "@/hooks/useRefresh";

const Index = () => {
  const { homeData, isLoading, error, refreshData } = useHomeContext();
  const { refreshing, handleRefresh } = useRefresh(refreshData);

  const { temperature, location, pulse, soundLevel, airQuality } = homeData;
  const { label: pulseLabel, value: pulseValue } = pulse;
  const { label: soundLabel, value: soundLevelValue } = soundLevel;

  const pulseStatus =
    pulseLabel === "High"
      ? "bad"
      : pulseLabel === "Moderate"
        ? "normal"
        : "good";

  const soundStatus =
    soundLabel === "Loud"
      ? "bad"
      : soundLabel === "Moderate"
        ? "normal"
        : "good";

  const soundLevelData = {
    type: "soundLevel" as const,
    data: { soundLevel: soundLevelValue },
    status: soundStatus as CardStatus,
  };

  const pulseData = {
    type: "pulse" as const,
    data: { pulse: pulseValue },
    status: pulseStatus as CardStatus,
  };
  const airQualityData = {
    type: "airQuality" as const,
    data: {
      propane: airQuality.propane,
      smoke: airQuality.smoke,
      co2: airQuality.co2,
    },
    status: "bad" as const,
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
