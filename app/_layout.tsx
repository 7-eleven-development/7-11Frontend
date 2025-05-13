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

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SoundLevelProvider>
        <PulseProvider>
          <ThemedView style={styles.container}>
            <StatusBar
              backgroundColor={backgroundColor}
              barStyle={
                colorScheme === "dark" ? "light-content" : "dark-content"
              }
              translucent={true}
            />
            <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
              <Stack>
                {/* <Login/> */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </SafeAreaView>
          </ThemedView>
        </PulseProvider>
      </SoundLevelProvider>
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
