import { StyleSheet, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import RefreshView from "@/components/RefreshView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import useRefresh from "@/hooks/useRefresh";
import { useContext } from "react";
import { AirQualityContext } from "@/context/airQuality/AirQualityContext";

const AirQuality = () => {
  const { CO2Status, PropaneStatus, SmokeStatus, isLoading, error, refreshData } = useContext(AirQualityContext);
  const colorScheme = useColorScheme();
  
  const textColor =
    colorScheme === "dark" ? Colors.dark.textColorLight : Colors.light.text;
  
  const { refreshing, handleRefresh } = useRefresh(refreshData);
  
  return (
    <RefreshView refreshing={refreshing} onRefresh={handleRefresh}>
      <ThemedView style={styles.container}>
        {isLoading && !refreshing ? (
          <LoadingSpinner color={textColor} />
        ) : error ? (
          <ErrorMessage colorScheme={colorScheme} />
        ) : (
          <>
            <ThemedText
              type="title"
              lightColor={textColor}
              darkColor={textColor}
              style={styles.mainTitle}
            >
              Luftkvalitet
            </ThemedText>
            
            {/* CO2 Section */}
            <View style={styles.sensorSection}>
              <ThemedText
                type="subtitle"
                lightColor={textColor}
                darkColor={textColor}
              >
                CO2
              </ThemedText>
              <Fontisto
                name={CO2Status.icon}
                size={48}
                style={styles.icon}
                color={textColor}
              />
              <ThemedText lightColor={textColor} darkColor={textColor}>
                {CO2Status.label}
              </ThemedText>
            </View>
            
            {/* Propane Section */}
            <View style={styles.sensorSection}>
              <ThemedText
                type="subtitle"
                lightColor={textColor}
                darkColor={textColor}
              >
                Propan
              </ThemedText>
              <Fontisto
                name={PropaneStatus.icon}
                size={48}
                style={styles.icon}
                color={textColor}
              />
              <ThemedText lightColor={textColor} darkColor={textColor}>
                {PropaneStatus.label}
              </ThemedText>
            </View>
            
            {/* Smoke Section */}
            <View style={styles.sensorSection}>
              <ThemedText
                type="subtitle"
                lightColor={textColor}
                darkColor={textColor}
              >
                Rök
              </ThemedText>
              <Fontisto
                name={SmokeStatus.icon}
                size={48}
                style={styles.icon}
                color={textColor}
              />
              <ThemedText lightColor={textColor} darkColor={textColor}>
                {SmokeStatus.label}
              </ThemedText>
            </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    marginBottom: 24,
  },
  sensorSection: {
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(200, 200, 200, 0.1)",
  },
  icon: {
    marginVertical: 12,
  },
});

export default AirQuality;