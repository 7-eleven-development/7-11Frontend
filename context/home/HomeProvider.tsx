import { HomeData } from "@/types/home";
import { HomeContext } from "./HomeContext";
import { ReactNode, useCallback, useState, useEffect } from "react";
import fetchPulse from "@/services/fetchPulse";
import fetchSoundLevel from "@/services/fetchSoundLevel";
import { getPulseStatus } from "@/utils/pulseUtils";
import { getSoundLevelStatus } from "@/utils/soundLevelUtils";

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
    airQuality: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const pulseData = await fetchPulse();
      const soundLevelData = await fetchSoundLevel();

      const pulse = pulseData.value[0].pulse;
      const soundLevel = soundLevelData.value[0].soundLevel;

      const { icon: pulseIcon, label: pulseLabel } = getPulseStatus(pulse);
      const { icon: soundIcon, label: soundLabel } =
        getSoundLevelStatus(soundLevel);
      setHomeData({
        location: {
          name: "Malmö",
          lat: 0,
          lon: 0,
        },
        temperature: 17,
        pulse: {
          value: pulse,
          icon: pulseIcon,
          label: pulseLabel,
        },
        soundLevel: {
          value: soundLevel,
          icon: soundIcon,
          label: soundLabel,
        },
        airQuality: 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error fetching home data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
