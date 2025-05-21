import { StyleSheet } from "react-native";
import Card, { CardStatus } from "@/components/Card";
import RefreshView from "@/components/RefreshView";
import ThemedView from "@/components/ThemedView";
import Header from "@/components/Header";
import { useRouter} from "expo-router";
import useHomeContext from "@/context/home/useHomeConext";
import useRefresh from "@/hooks/useRefresh";


const Index = () => {
  const { homeData, isLoading, error, refreshData } = useHomeContext();
  const { refreshing, handleRefresh } = useRefresh(refreshData);

  const router = useRouter();
  const { temperature, location, pulse, soundLevel } = homeData;
  const { label: pulseLabel, value: pulseValue } = pulse;
  const { label: soundLabel, value: soundLevelValue } = soundLevel;

  const pulseStatus =
    pulseLabel === "Högt"
      ? "bad"
      : pulseLabel === "Måttligt"
      ? "normal"
      : "bra";

  const soundStatus =
    soundLabel === "Högt"
      ? "bad"
      : soundLabel === "Måttligt"
      ? "normal"
      : "bra";

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
    data: { pm1: 5, pm2: 10, pm10: 15, tvoc: 20 },
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
