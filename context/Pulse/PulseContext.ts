import { createContext } from "react";
import { PulseContextType } from "@/types/pulse";

export const PulseContext = createContext<PulseContextType>({
  pulseData: {
    icon: "smileo",
    label: "",
    value: 0,
  },
  isLoading: false,
  error: null,
  refreshData: async () => {},
});
