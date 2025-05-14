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

export type SoundLevelStatus = {
  icon: IconName;
  label: string;
};
