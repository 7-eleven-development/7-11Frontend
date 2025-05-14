import { useState } from "react";
import { StyleSheet } from "react-native";
import Card from "@/components/Card";
import RefreshView from "@/components/RefreshView";
import ThemedView from "@/components/ThemedView";
import Header from "@/components/Header";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Mock refresh function
  const onRefresh = () => {
    setRefreshing(true);

    // Simulate API delay with timeout
    setTimeout(() => {
      // No actual data refresh happens here - just UI state
      console.log("Mock refresh completed");
      setRefreshing(false);
    }, 1500);
  };

  const soundLevelData = {
    type: "soundLevel" as const,
    data: { soundLevel: 10 },
    status: "good" as const,
  };

  const pulseData = {
    type: "pulse" as const,
    data: { pulse: 70 },
    status: "normal" as const,
  };
  const airQualityData = {
    type: "airQuality" as const,
    data: { pm1: 5, pm2: 10, pm10: 15, tvoc: 20 },
    status: "bad" as const,
  };

  return (
    <RefreshView refreshing={refreshing} onRefresh={onRefresh}>
      <Header />
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
