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

  return (
    <RefreshView refreshing={refreshing} onRefresh={onRefresh}>
      <Header />
      <ThemedView style={styles.container}>
        <Card title="Gas" dataType="gas" data={107} iconType="meh" />
        <Card
          title="Sound Level"
          dataType="soundLevel"
          data={65}
          iconType="smile"
        />
        <Card title="Pulse" dataType="pulse" data={80} iconType="frown" />
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
