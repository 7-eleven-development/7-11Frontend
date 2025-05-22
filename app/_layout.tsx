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
import { UserContextProvider } from "@/context/userContext";
import HomeProvider from "@/context/home/HomeProvider";
import AuthProvider from "@/context/auth/AuthProvider";
import { useAuthContext } from "@/context/auth/useAuthContext";
import AirQualityProvider from "@/context/airQuality/AirQualityProvider";

const AppContent = () => {
  const { isAuthenticated } = useAuthContext();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <UserContextProvider>
          <HomeProvider>
            <SoundLevelProvider>
              <PulseProvider>
                <AirQualityProvider>
                  <AppContent />
                </AirQualityProvider>
              </PulseProvider>
            </SoundLevelProvider>
          </HomeProvider>
        </UserContextProvider>
      </AuthProvider>
    </ThemeProvider>
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
