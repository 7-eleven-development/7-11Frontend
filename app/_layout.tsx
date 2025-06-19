import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppUpdates } from "@/hooks/useAppUpdates";
import ThemedView from "@/components/ThemedView";
import AppProviders from "@/app/Providers";
import AppStatusBar from "@/components/AppStatusBar";
import AppNavigation from "@/components/AppNavigation";

const AppContent = () => {
  const { tabBarBackground } = useColorScheme();

  useAppUpdates();

  return (
    <ThemedView style={styles.container}>
      <AppStatusBar />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: tabBarBackground }]}
      >
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
