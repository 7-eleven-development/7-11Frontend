import { useContext } from "react";
import { PulseContext } from "@/context/Pulse/PulseContext";
import { PulseContextType } from "@/types/pulse";

const usePulseContext = (): PulseContextType => {
  const context = useContext(PulseContext);
  if (context === undefined) {
    throw new Error("usePulseContext must be used within a PulseProvider");
  }
  return context;
};
export default usePulseContext;
