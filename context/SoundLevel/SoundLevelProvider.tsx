import { ReactNode, useEffect, useState, useCallback } from "react";
import {
  SoundLevelContext,
  SoundLevelData,
} from "@/context/SoundLevel/SoundLevelContext";
import { IconName } from "@/types/icons";
import fetchSoundLevel from "@/context/SoundLevel/fetchSoundLevel";

type Props = {
  children: ReactNode;
};

type SoundLevelStatus = {
  icon: IconName;
  label: string;
};

const getSoundLevelStatus = (soundValue: number): SoundLevelStatus => {
  if (soundValue >= 85) {
    return {
      icon: "frowno",
      label: "Högt",
    };
  }
  if (soundValue >= 60) {
    return {
      icon: "meh",
      label: "Måttligt",
    };
  }
  return {
    icon: "smileo",
    label: "Tyst",
  };
};

const SoundLevelProvider = ({ children }: Props) => {
  const [soundLevelData, setSoundLevelData] = useState<SoundLevelData>({
    icon: "smileo",
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
