import { ReactNode, useEffect, useState, useCallback } from "react";
import { SoundLevelContext } from "@/context/SoundLevel/SoundLevelContext";
import fetchSoundLevel from "@/services/fetchSoundLevel";
import { SoundLevelData } from "@/types/soundLevel";
import { getSoundLevelStatus } from "@/utils/soundLevelUtils";

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

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchSoundLevel();
      const soundLevel = data.value[0].soundLevel;
      const { icon, label } = getSoundLevelStatus(soundLevel);

      setSoundLevelData({
        icon,
        label,
        value: soundLevel,
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
