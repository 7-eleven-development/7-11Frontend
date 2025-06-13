import { ReactNode } from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import AuthProvider from "@/context/auth/AuthProvider";
import UserProvider from "@/context/user/UserProvider";
import HomeProvider from "@/context/home/HomeProvider";
import SoundLevelProvider from "@/context/SoundLevel/SoundLevelProvider";
import PulseProvider from "@/context/Pulse/PulseProvider";
import AirQualityProvider from "@/context/airQuality/AirQualityProvider";
import LocationProvider from "@/context/location/LocationProvider";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const { colorScheme } = useColorScheme();

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
                  <LocationProvider>{children}</LocationProvider>
                </AirQualityProvider>
              </PulseProvider>
            </SoundLevelProvider>
          </HomeProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
