import { createContext } from "react";
import { SoundLevelContextType } from "@/types/soundLevel";

export const SoundLevelContext = createContext<SoundLevelContextType>({
  soundLevelData: {
    icon: "slightly-smile",
    label: "",
    value: 0,
  },
  weeklyData: [],
  monthlyData: [],
  isLoading: false,
  error: null,
  refreshData: async () => {},
});