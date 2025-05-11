import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';
import  Login  from '@/app/Login';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  return (

    <ThemeProvider value={ colorScheme === 'dark' ? DarkTheme : DefaultTheme }> 
    <SafeAreaView style={styles.safeArea}>
      
{/*       
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />  */}
       <Login/>

    </SafeAreaView>
 </ThemeProvider> 
 );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default RootLayout;
