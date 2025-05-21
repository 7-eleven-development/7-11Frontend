import { PulseStatus } from "@/types/pulse";

export const getPulseStatus = (pulseValue: number): PulseStatus => {
  if (pulseValue >= 100) {
    return {
      icon: "frowning",
      label: "High",
    };
  }
  if (pulseValue >= 80) {
    return {
      icon: "slightly-smile",
      label: "Moderate",
    };
  }
  return {
    icon: "smiley",
    label: "Low",
  };
};
