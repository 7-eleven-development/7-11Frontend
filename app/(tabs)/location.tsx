import { StyleSheet, View, Pressable, AccessibilityInfo } from "react-native";
import { useEffect } from "react";
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

  // Announce location updates
  useEffect(() => {
    if (locationData && !isLoading) {
      AccessibilityInfo.announceForAccessibility("Platsdata har uppdaterats");
    }
  }, [locationData, isLoading]);

  if (isLoading) {
    return (
      <ThemedView
        style={styles.centerContainer}
        accessible={true}
        accessibilityLabel="Laddar platsdata"
        accessibilityRole="none"
      >
        <LoadingSpinner color={text} />
        <ThemedText
          type="subtitle"
          lightColor={text}
          darkColor={text}
          accessible={true}
          accessibilityRole="text"
        >
          Hämtar platsdata...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        style={styles.centerContainer}
        accessible={true}
        accessibilityLabel="Fel vid hämtning av platsdata"
        accessibilityRole="alert"
      >
        <ThemedText
          lightColor={text}
          darkColor={text}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Felmeddelande: ${error}`}
        >
          Fel: {error}
        </ThemedText>
        <Pressable
          style={styles.retryButton}
          onPress={refreshLocation}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Försök igen"
          accessibilityHint="Tryck för att försöka hämta platsdata igen"
        >
          <ThemedText style={styles.retryText} accessible={false}>
            Försök igen
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (!locationData) {
    return (
      <ThemedView
        style={styles.centerContainer}
        accessible={true}
        accessibilityLabel="Ingen platsdata tillgänglig"
        accessibilityRole="alert"
      >
        <ThemedText
          lightColor={text}
          darkColor={text}
          accessible={true}
          accessibilityRole="text"
        >
          Ingen platsdata tillgänglig
        </ThemedText>
        <Pressable
          style={styles.retryButton}
          onPress={refreshLocation}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Försök igen"
          accessibilityHint="Tryck för att försöka hämta platsdata"
        >
          <ThemedText style={styles.retryText} accessible={false}>
            Försök igen
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={styles.container}
      accessible={true}
      accessibilityLabel="Platsskärm"
      accessibilityRole="none"
    >
      <View
        style={styles.mapContainer}
        accessible={true}
        accessibilityLabel={`Karta som visar aktuell plats: latitud ${locationData.latitude.toFixed(4)}, longitud ${locationData.longitude.toFixed(4)}`}
        accessibilityRole="image"
      >
        <OpenStreetMapView
          latitude={locationData.latitude}
          longitude={locationData.longitude}
          onRefresh={refreshLocation}
        />

        <Pressable
          style={[styles.refreshButton, { backgroundColor: background }]}
          onPress={refreshLocation}
          disabled={isLoading}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Uppdatera plats"
          accessibilityHint="Tryck för att uppdatera kartdata"
          accessibilityState={{ disabled: isLoading }}
        >
          <Ionicons
            name="refresh"
            size={24}
            color={isLoading ? "#ccc" : tint}
            accessibilityLabel="Uppdateringsikon"
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
