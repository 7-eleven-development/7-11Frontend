import { ReactNode, useEffect, useState, useCallback } from "react";
import { SoundLevelContext } from "@/context/SoundLevel/SoundLevelContext";

import { SoundLevelData } from "@/types/soundLevel";
import { HistoricalDataPoint } from "@/types/historicalData";
import { getSoundLevelStatus } from "@/utils/soundLevelUtils";
import { soundLevelServices } from "@/services/soundLevelServices";
import { useAuthContext } from "@/context/auth/useAuthContext";

type Props = {
  children: ReactNode;
};

const SoundLevelProvider = ({ children }: Props) => {
  const [soundLevelData, setSoundLevelData] = useState<SoundLevelData>({
    icon: "slightly-smile", 
    label: "",
    value: 0,
  });
  const [weeklyData, setWeeklyData] = useState<HistoricalDataPoint[]>([]);
  const [monthlyData, setMonthlyData] = useState<HistoricalDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { token, deviceId } = useAuthContext();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!token || !deviceId) {
        throw new Error("Token or Device ID is missing");
      }

      // Fetch current sound level
      const soundLevelResponse = await soundLevelServices.fetchLatestSoundLevel(
        token,
        deviceId
      );
      const latestSoundLevel = soundLevelResponse.latest_sound;
      const { icon, label } = getSoundLevelStatus(latestSoundLevel);

      console.log("Sound Level Response:", soundLevelResponse);
      setSoundLevelData({
        icon,
        label,
        value: latestSoundLevel,
      });

      // Fetch weekly and monthly data
      const weeklyDataResponse =
        await soundLevelServices.fetchWeeklySoundLevelData();
      setWeeklyData(weeklyDataResponse);
      console.log("Weekly Data Response:", weeklyDataResponse);

      const monthlyDataResponse =
        await soundLevelServices.fetchMonthlySoundLevelData();
      setMonthlyData(monthlyDataResponse);
      console.log("Monthly Data Response:", monthlyDataResponse);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      console.error("Error fetching sound level data:", err);
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
    <SoundLevelContext.Provider
      value={{
        soundLevelData,
        weeklyData,
        monthlyData,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </SoundLevelContext.Provider>
  );
};

export default SoundLevelProvider;
