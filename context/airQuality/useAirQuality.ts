import { useContext } from "react";
import { AirQualityContextType } from "@/types/airQuality";
import { AirQualityContext } from "./AirQualityContext";

const useAirQualityContext = (): AirQualityContextType => {
  const context = useContext(AirQualityContext);

  if (context === undefined) {
    throw new Error(
      "useSoundLevelContext must be used within a SoundLevelProvider"
    );
  }

  return context;
};

export default useAirQualityContext;
