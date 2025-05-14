import { ReactNode, useEffect, useState, useCallback } from "react";
import { PulseContext } from "@/context/Pulse/PulseContext";
import { PulseData, PulseStatus } from "@/types/pulse";
import fetchPulse from "@/services/fetchPulse";

type Props = {
  children: ReactNode;
};

const getPulseStatus = (pulseValue: number): PulseStatus => {
  if (pulseValue >= 100) {
    return {
      icon: "frowno",
      label: "High",
    };
  }
  if (pulseValue >= 80) {
    return {
      icon: "meh",
      label: "Moderate",
    };
  }
  return {
    icon: "smileo",
    label: "Low",
  };
};

const PulseProvider = ({ children }: Props) => {
  const [pulseData, setPulseData] = useState<PulseData>({
    icon: "smileo",
    label: "",
    value: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchPulse();
      const pulse = data.value[0].pulse;
      const { icon, label } = getPulseStatus(pulse);

      setPulseData({
        icon,
        label,
        value: pulse,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      console.error("Error fetching sound level:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
