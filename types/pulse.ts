import { IconName } from "@/types/icons";
import { HistoricalDataPoint } from "@/types/historicalData";

export interface PulseData {
  icon: IconName;
  label: string;
  value: number;
}

export interface PulseContextType {
  pulseData: PulseData;
  isLoading: boolean;
  error: Error | null;
  weeklyData: HistoricalDataPoint[];
  monthlyData: HistoricalDataPoint[];
  refreshData: () => Promise<void>;
}

export type PulseStatus = {
  icon: IconName;
  label: string;
};
