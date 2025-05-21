import { ReactNode, useEffect, useState, useCallback } from "react";
import { SoundLevelContext } from "@/context/SoundLevel/SoundLevelContext";
import { SoundLevelData } from "@/types/soundLevel";
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
      const soundLevelResponse = await soundLevelServices.fetchLatestSoundLevel(
        token,
        deviceId
      );
      const latestSoundLevel = soundLevelResponse.latest_sound;
      const { icon, label } = getSoundLevelStatus(latestSoundLevel);

      setSoundLevelData({
        icon,
        label,
        value: latestSoundLevel,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      console.error("Error fetching sound level:", err);
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
    <SoundLevelContext.Provider
      value={{
        soundLevelData,
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
