import { createContext } from "react";
import { IconName } from "@/types/icons";

export interface PulseData {
  icon: IconName;
  label: string;
  value: number;
}

export interface PulseContextType {
  pulseData: PulseData;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

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
