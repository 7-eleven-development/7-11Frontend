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
import { HistoricalDataPoint } from "@/types/historicalData";

type Props = {
  children: ReactNode;
};

const AirQualityProvider = ({ children }: Props) => {
  const [currentValues, setCurrentValues] = useState({
    co2: 0,
    propane: 0,
    smoke: 0,
  });

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

  // Add state for historical data
  const [co2WeeklyData, setCo2WeeklyData] = useState<HistoricalDataPoint[]>([]);
  const [co2MonthlyData, setCo2MonthlyData] = useState<HistoricalDataPoint[]>(
    []
  );
  const [propaneWeeklyData, setPropaneWeeklyData] = useState<
    HistoricalDataPoint[]
  >([]);
  const [propaneMonthlyData, setPropaneMonthlyData] = useState<
    HistoricalDataPoint[]
  >([]);
  const [smokeWeeklyData, setSmokeWeeklyData] = useState<HistoricalDataPoint[]>(
    []
  );
  const [smokeMonthlyData, setSmokeMonthlyData] = useState<
    HistoricalDataPoint[]
  >([]);

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

      setCurrentValues({
        co2: co2Value,
        propane: propaneValue,
        smoke: smokeValue,
      });

      // Set the status for each measurement using utility functions
      setCO2Status(getCO2Status(co2Value));
      setPropaneStatus(getPropaneStatus(propaneValue));
      setSmokeStatus(getSmokeStatus(smokeValue));

      // Fetch historical data (you'll need to add these service methods)
      const weeklyDataResponse =
        await airQualityServices.fetchWeeklyAirQualityData();
      const monthlyDataResponse =
        await airQualityServices.fetchMonthlyAirQualityData();

      // Transform data into separate arrays for each sensor
      const co2Weekly = weeklyDataResponse.map((item) => ({
        created_at: item.created_at,
        co2: parseFloat(item.co2),
      }));
      const co2Monthly = monthlyDataResponse.map((item) => ({
        created_at: item.created_at,
        co2: parseFloat(item.co2),
      }));

      const propaneWeekly = weeklyDataResponse.map((item) => ({
        created_at: item.created_at,
        propane: parseFloat(item.propane),
      }));
      const propaneMonthly = monthlyDataResponse.map((item) => ({
        created_at: item.created_at,
        propane: parseFloat(item.propane),
      }));

      const smokeWeekly = weeklyDataResponse.map((item) => ({
        created_at: item.created_at,
        smoke: parseFloat(item.smoke),
      }));
      const smokeMonthly = monthlyDataResponse.map((item) => ({
        created_at: item.created_at,
        smoke: parseFloat(item.smoke),
      }));

      setCo2WeeklyData(co2Weekly);
      setCo2MonthlyData(co2Monthly);
      setPropaneWeeklyData(propaneWeekly);
      setPropaneMonthlyData(propaneMonthly);
      setSmokeWeeklyData(smokeWeekly);
      setSmokeMonthlyData(smokeMonthly);
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
        currentValues,
        CO2Status,
        PropaneStatus,
        SmokeStatus,
        co2WeeklyData,
        co2MonthlyData,
        propaneWeeklyData,
        propaneMonthlyData,
        smokeWeeklyData,
        smokeMonthlyData,
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
