import { createContext } from "react";
import { SoundLevelContextType } from "@/types/soundLevel";

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
