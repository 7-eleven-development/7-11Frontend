import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import Login from "@/app/Login";
import { Colors } from "@/theme/Colors";
import SoundLevelProvider from "@/context/SoundLevel/SoundLevelProvider";
import ThemedView from "@/components/ThemedView";
import PulseProvider from "@/context/Pulse/PulseProvider";
import HomeProvider from "@/context/home/HomeProvider";
import AuthProvider from "@/context/auth/AuthProvider";
import { useAuthContext } from "@/context/auth/useAuthContext";
import AirQualityProvider from "@/context/airQuality/AirQualityProvider";
import UserProvider from "@/context/user/UserProvider";
import LocationProvider from "@/context/location/LocationProvider";
import { useEffect } from "react";
import * as Updates from "expo-updates";

const AppContent = () => {
  const { isAuthenticated } = useAuthContext();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.tabBarBackground;

  useEffect(() => {
    async function checkForUpdates() {
      try {
        // Only check for updates in production builds
        if (!__DEV__) {
          console.log("Checking for updates...");
          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            console.log("Update available, fetching...");
            await Updates.fetchUpdateAsync();
            console.log("Update fetched, reloading...");
            await Updates.reloadAsync();
          } else {
            console.log("No updates available");
          }
        } else {
          console.log("Development mode - skipping update check");
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    }

    // Check for updates when app starts
    checkForUpdates();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        translucent={true}
      />
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        {isAuthenticated ? (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        ) : (
          <Login />
        )}
      </SafeAreaView>
    </ThemedView>
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <HomeProvider>
            <SoundLevelProvider>
              <PulseProvider>
                <AirQualityProvider>
                  <LocationProvider>
                    <AppContent />
                  </LocationProvider>
                </AirQualityProvider>
              </PulseProvider>
            </SoundLevelProvider>
          </HomeProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default RootLayout;
