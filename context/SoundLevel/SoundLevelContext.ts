import { createContext } from "react";
import { IconName } from "@/types/icons";

export interface SoundLevelData {
  icon: IconName;
  label: string;
  value: number;
}

export interface SoundLevelContextType {
  soundLevelData: SoundLevelData;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

export const SoundLevelContext = createContext<SoundLevelContextType>({
  soundLevelData: {
    icon: "smileo",
    label: "",
    value: 0,
  },
  isLoading: false,
  error: null,
  refreshData: async () => {},
});
