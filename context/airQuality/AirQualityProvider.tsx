import { ReactNode, useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { SensorStatus } from "@/types/airQuality";
import { airQualityServices } from "@/services/airQualityServices";
import { AirQualityContext } from "./AirQualityContext";
import {
  getCO2Status,
  getPropaneStatus,
  getSmokeStatus,
} from "@/utils/airQualityUtils";

type Props = {
  children: ReactNode;
};

const AirQualityProvider = ({ children }: Props) => {
  const [CO2Status, setCO2Status] = useState<SensorStatus>({
    icon: "slightly-smile",
    label: "Loading...",
  });

  const [PropaneStatus, setPropaneStatus] = useState<SensorStatus>({
    icon: "slightly-smile",
    label: "Loading...",
  });

  const [SmokeStatus, setSmokeStatus] = useState<SensorStatus>({
    icon: "slightly-smile",
    label: "Loading...",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { token, deviceId } = useAuthContext();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!token || !deviceId) {
        throw new Error("Token or Device ID is missing");
      }

      const airQualityResponse = await airQualityServices.fetchLatestAirQuality(
        token,
        deviceId
      );

      // Process the air quality data
      const co2Value = parseFloat(airQualityResponse.latest_co2);
      const propaneValue = parseFloat(airQualityResponse.latest_propane);
      const smokeValue = parseFloat(airQualityResponse.latest_smoke);

      // Set the status for each measurement using utility functions
      setCO2Status(getCO2Status(co2Value));
      setPropaneStatus(getPropaneStatus(propaneValue));
      setSmokeStatus(getSmokeStatus(smokeValue));

      console.log("Air Quality Response:", airQualityResponse);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      console.error("Error fetching air quality:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, deviceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return (
    <AirQualityContext.Provider
      value={{
        CO2Status,
        PropaneStatus,
        SmokeStatus,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </AirQualityContext.Provider>
  );
};

export default AirQualityProvider;
