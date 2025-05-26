import { ReactNode, useEffect, useState, useCallback } from "react";
import { PulseContext } from "@/context/Pulse/PulseContext";
import { PulseData, PulseStatus } from "@/types/pulse";
import { getPulseStatus } from "@/utils/pulseUtils";
import { pulseServices } from "@/services/pulseServices";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { HistoricalDataPoint } from "@/types/historicalData";
type Props = {
  children: ReactNode;
};

const PulseProvider = ({ children }: Props) => {
  const [pulseData, setPulseData] = useState<PulseData>({
    icon: "slightly-smile",  
    label: "",
    value: 0,
  });
  const [weeklyData, setWeeklyData] = useState<HistoricalDataPoint[]>([]);
  const [monthlyData, setMonthlyData] = useState<HistoricalDataPoint[]>([]);
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
      const data = await pulseServices.fetchLatestPulse(token, deviceId);
      const pulse = data.latest_pulse;
      const { icon, label } = getPulseStatus(pulse);

      setPulseData({
        icon,
        label,
        value: pulse,
      });

      const weeklyDataResponse =
        await pulseServices.fetchWeeklySoundLevelData();
      setWeeklyData(weeklyDataResponse);
      const monthlyDataResponse =
        await pulseServices.fetchMonthlySoundLevelData();
      setMonthlyData(monthlyDataResponse);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      console.error("Error fetching pulse:", err);
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
    <PulseContext.Provider
      value={{
        pulseData,
        weeklyData,
        monthlyData,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </PulseContext.Provider>
  );
};

export default PulseProvider;

