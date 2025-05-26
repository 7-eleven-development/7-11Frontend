import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import ThemedView from "@/components/ThemedView";
import useLocationContext from "@/context/location/useLocationContext";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import ThemedText from "@/components/ThemedText";
import LoadingSpinner from "@/components/LoadingSpinner";

const Location = () => {
  const { locationData, isLoading, error, refreshLocation } =
    useLocationContext();
  const colorScheme = useColorScheme();

  const INITIAL_REGION = {
    latitude: locationData?.latitude || 59.325117,
    longitude: locationData?.longitude || 18.071094,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;
  const refreshButtonColor =
    colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;
  const refreshButtonBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <LoadingSpinner color={textColor} />
        <ThemedText
          type="subtitle"
          lightColor={textColor}
          darkColor={textColor}
        >
          Hämtar platsdata...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText lightColor={textColor} darkColor={textColor}>
          Fel: {error}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={INITIAL_REGION}
          region={
            locationData
              ? {
                  latitude: locationData.latitude,
                  longitude: locationData.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : INITIAL_REGION
          }
          provider={PROVIDER_DEFAULT} // Use platform default
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          {locationData && (
            <Marker
              coordinate={{
                latitude: locationData.latitude,
                longitude: locationData.longitude,
              }}
              title="Din plats"
              description="Din nuvarande plats"
            />
          )}
        </MapView>

        {/* Refresh Button */}
        <TouchableOpacity
          style={[
            styles.refreshButton,
            { backgroundColor: refreshButtonBackgroundColor },
          ]}
          onPress={refreshLocation}
          disabled={isLoading}
        >
          <Ionicons
            name="refresh"
            size={24}
            color={isLoading ? "#ccc" : refreshButtonColor}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 60,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 50,
    overflow: "hidden",
    borderRadius: 16,
    position: "relative",
  },
  refreshButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Location;
