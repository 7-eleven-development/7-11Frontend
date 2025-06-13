import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppUpdates } from "@/hooks/useAppUpdates";
import { Colors } from "@/theme/Colors";
import ThemedView from "@/components/ThemedView";
import AppProviders from "@/app/Providers";
import AppStatusBar from "@/components/AppStatusBar";
import AppNavigation from "@/components/AppNavigation";

const AppContent = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark"
      ? Colors.dark.tabBarBackground
      : Colors.light.tabBarBackground;

  useAppUpdates();

  return (
    <ThemedView style={styles.container}>
      <AppStatusBar />
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <AppNavigation />
      </SafeAreaView>
    </ThemedView>
  );
};

const RootLayout = () => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
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
