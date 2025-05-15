import { useContext } from "react";
import { HomeContextType } from "@/types/home";
import { HomeContext } from "./HomeContext";

const useHomeContext = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("usePulseContext must be used within a PulseProvider");
  }
  return context;
};
export default useHomeContext;
