import { HomeData } from "@/types/home";
import { HomeContext } from "./HomeContext";
import { ReactNode, useCallback, useState, useEffect } from "react";
import { getPulseStatus } from "@/utils/pulseUtils";
import { getSoundLevelStatus } from "@/utils/soundLevelUtils";
import { homeService } from "@/services/homeService";
import { useAuthContext } from "@/context/auth/useAuthContext";

type Props = {
  children: ReactNode;
};
const HomeProvider = ({ children }: Props) => {
  const [homeData, setHomeData] = useState<HomeData>({
    location: {
      name: "",
      lat: 0,
      lon: 0,
    },
    temperature: 0,
    pulse: {
      value: 0,
      icon: "slightly-smile",
      label: "",
    },
    soundLevel: {
      value: 0,
      icon: "slightly-smile",
      label: "",
    },
    airQuality: {
      smoke: 0,
      propane: 0,
      co2: 0,
    },
  });

  const { token, deviceId } = useAuthContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!token || !deviceId) {
        throw new Error("Token or Device ID is missing");
      }

      const data = await homeService.fetchCurrentData(deviceId, token);

      const latestSoundLevel = data.trend.soundlevel[0].sound;
      const latestPulse = data.trend.pulse[0].pulse;
      const latestTemperature = parseFloat(
        data.trend.temperature[0].temperature
      );

      const latestAirQuality = {
        smoke: parseFloat(data.trend.airquality[0].smoke),
        propane: parseFloat(data.trend.airquality[0].propane),
        co2: parseFloat(data.trend.airquality[0].co2),
      };

      const latestPosition = {
        latitude: data.trend.position[0].latitude,
        longitude: data.trend.position[0].longitude,
      };

      const { icon: pulseIcon, label: pulseLabel } =
        getPulseStatus(latestPulse);
      const { icon: soundIcon, label: soundLabel } =
        getSoundLevelStatus(latestSoundLevel);

      setHomeData({
        location: {
          name: "Stockholm",
          lat: latestPosition.latitude,
          lon: latestPosition.longitude,
        },
        temperature: latestTemperature,
        pulse: {
          value: latestPulse,
          icon: pulseIcon,
          label: pulseLabel,
        },
        soundLevel: {
          value: latestSoundLevel,
          icon: soundIcon,
          label: soundLabel,
        },
        airQuality: {
          smoke: latestAirQuality.smoke,
          propane: latestAirQuality.propane,
          co2: latestAirQuality.co2,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error fetching home data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, deviceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return (
    <HomeContext.Provider
      value={{
        homeData,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
