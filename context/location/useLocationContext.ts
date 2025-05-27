import { useContext } from "react";
import { LocationContextType } from "@/types/location";
import { LocationContext } from "./LocationContext";

const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};

export default useLocationContext;