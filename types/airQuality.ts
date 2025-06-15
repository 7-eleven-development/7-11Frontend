import { IconName } from "@/types/icons";
import { HistoricalDataPoint } from "./historicalData";

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
  currentValues: {
    co2: number;
    propane: number;
    smoke: number;
  };
  CO2Status: SensorStatus;
  PropaneStatus: SensorStatus;
  SmokeStatus: SensorStatus;
  co2WeeklyData: HistoricalDataPoint[];
  co2MonthlyData: HistoricalDataPoint[];
  propaneWeeklyData: HistoricalDataPoint[];
  propaneMonthlyData: HistoricalDataPoint[];
  smokeWeeklyData: HistoricalDataPoint[];
  smokeMonthlyData: HistoricalDataPoint[];
  isLoading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

export type CO2Status = SensorStatus;
export type PropaneStatus = SensorStatus;
export type SmokeStatus = SensorStatus;
