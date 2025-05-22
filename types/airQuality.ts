import { IconName } from "@/types/icons";

// Common sensor status type for all measurements
export interface SensorStatus {
  icon: IconName;
  label: string;
}

export interface AirQualityData {
  icon: IconName;
  label: string;
  values: {
    smoke: number;
    propane: number;
    co2: number;
  };
}

export interface AirQualityContextType {
  CO2Status: SensorStatus;
  PropaneStatus: SensorStatus;
  SmokeStatus: SensorStatus; // Fixed the typo in SmokeStatusStatus
  isLoading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

export type CO2Status = SensorStatus;
export type PropaneStatus = SensorStatus;
export type SmokeStatus = SensorStatus;