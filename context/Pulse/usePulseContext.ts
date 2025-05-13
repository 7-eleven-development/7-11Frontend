import { useContext } from "react";
import { PulseContext, PulseContextType } from "@/context/Pulse/PulseContext";

const usePulseContext = (): PulseContextType => {
  const context = useContext(PulseContext);
  if (context === undefined) {
    throw new Error("usePulseContext must be used within a PulseProvider");
  }
  return context;
};
export default usePulseContext;
