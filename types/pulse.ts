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

export type PulseStatus = {
  icon: IconName;
  label: string;
};
