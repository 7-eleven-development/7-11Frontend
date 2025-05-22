import { AirQualityContextType, SensorStatus } from "@/types/airQuality";
import { createContext } from "react";

// Default sensor status
const defaultSensorStatus: SensorStatus = {
  icon: "slightly-smile",
  label: "Laddar...",
};

export const AirQualityContext = createContext<AirQualityContextType>({
  CO2Status: defaultSensorStatus,
  PropaneStatus: defaultSensorStatus,
  SmokeStatus: defaultSensorStatus,
  isLoading: false,
  error: null,
  refreshData: async () => {},
});
