import { LocationData } from "@/types/location";
import { LocationContext } from "./LocationContext";
import { ReactNode, useCallback, useState, useEffect } from "react";
import { locationService } from "@/services/locationService";
import { useAuthContext } from "@/context/auth/useAuthContext";

type Props = {
  children: ReactNode;
};

const LocationProvider = ({ children }: Props) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token, deviceId } = useAuthContext();

  const fetchLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!token || !deviceId) {
        throw new Error("Token or Device ID is missing");
      }

      const data = await locationService.fetchLatestPosition(token, deviceId);

      setLocationData({
        latitude: parseFloat(data.latest_latitude),
        longitude: parseFloat(data.latest_longitude),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error fetching location data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, deviceId]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const refreshLocation = useCallback(async () => {
    await fetchLocation();
  }, [fetchLocation]);

  return (
    <LocationContext.Provider
      value={{
        locationData,
        isLoading,
        error,
        refreshLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
