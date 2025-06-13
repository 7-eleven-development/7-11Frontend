import { StyleSheet, View, Pressable } from "react-native";
import ThemedView from "@/components/ThemedView";
import useLocationContext from "@/context/location/useLocationContext";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import ThemedText from "@/components/ThemedText";
import LoadingSpinner from "@/components/LoadingSpinner";
import OpenStreetMapView from "@/components/OpenStreetMapView";

const Location = () => {
  const { locationData, isLoading, error, refreshLocation } =
    useLocationContext();
  const { text, tint, background } = useColorScheme();

  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <LoadingSpinner color={text} />
        <ThemedText type="subtitle" lightColor={text} darkColor={text}>
          Hämtar platsdata...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText lightColor={text} darkColor={text}>
          Fel: {error}
        </ThemedText>
        <Pressable style={styles.retryButton} onPress={refreshLocation}>
          <ThemedText style={styles.retryText}>Försök igen</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (!locationData) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText lightColor={text} darkColor={text}>
          Ingen platsdata tillgänglig
        </ThemedText>
        <Pressable style={styles.retryButton} onPress={refreshLocation}>
          <ThemedText style={styles.retryText}>Försök igen</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mapContainer}>
        <OpenStreetMapView
          latitude={locationData.latitude}
          longitude={locationData.longitude}
          onRefresh={refreshLocation}
        />

        <Pressable
          style={[styles.refreshButton, { backgroundColor: background }]}
          onPress={refreshLocation}
          disabled={isLoading}
        >
          <Ionicons
            name="refresh"
            size={24}
            color={isLoading ? "#ccc" : tint}
          />
        </Pressable>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 50,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  refreshButton: {
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  retryButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: Colors.dark.tint,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    textAlign: "center",
  },
});

export default Location;
