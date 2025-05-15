import { useEffect, useRef } from "react";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { StyleSheet, View } from "react-native";
import ThemedView from "@/components/ThemedView";

const Location = () => {
  const INITIAL_REGION = {
    latitude: 59.293314,
    longitude: 18.0882497,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };
  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <View style={{ flex: 1, marginBottom: 50, overflow: "hidden", borderRadius: 16 }}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={INITIAL_REGION}
          provider={PROVIDER_GOOGLE}
        ></MapView>
      </View>
    </ThemedView>
  );
};
export default Location;
