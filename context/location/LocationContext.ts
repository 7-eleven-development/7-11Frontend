import { createContext } from "react";
import { LocationContextType } from "@/types/location";

export const LocationContext = createContext<LocationContextType>({
  locationData: null,
  isLoading: false,
  error: null,
  refreshLocation: async () => {},
});
