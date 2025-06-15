import { AirQualityContextType, SensorStatus } from "@/types/airQuality";
import { createContext } from "react";

const defaultSensorStatus: SensorStatus = {
  icon: "slightly-smile",
  label: "Laddar...",
};

export const AirQualityContext = createContext<AirQualityContextType>({
  currentValues: {
    co2: 0,
    propane: 0,
    smoke: 0,
  },
  CO2Status: defaultSensorStatus,
  PropaneStatus: defaultSensorStatus,
  SmokeStatus: defaultSensorStatus,
  isLoading: false,
  error: null,
  co2WeeklyData: [],
  co2MonthlyData: [],
  propaneWeeklyData: [],
  propaneMonthlyData: [],
  smokeWeeklyData: [],
  smokeMonthlyData: [],
  refreshData: async () => {},
});
