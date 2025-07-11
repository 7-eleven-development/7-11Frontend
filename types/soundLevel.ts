import { IconName } from "@/types/icons";
import { HistoricalDataPoint } from "@/types/historicalData";
export interface SoundLevelData {
  icon: IconName;
  label: string;
  value: number;
}

export interface SoundLevelContextType {
  soundLevelData: SoundLevelData;
  isLoading: boolean;
  error: Error | null;
  weeklyData: HistoricalDataPoint[];
  monthlyData: HistoricalDataPoint[];
  refreshData: () => Promise<void>;
}

export type SoundLevelStatus = {
  icon: IconName;
  label: string;
};
