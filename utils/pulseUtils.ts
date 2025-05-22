import { PulseStatus } from "@/types/pulse";

export const getPulseStatus = (pulseValue: number): PulseStatus => {
  if (pulseValue >= 100) {
    return {
      icon: "frowning",
      label: "Hög puls",
    };
  }
  if (pulseValue >= 80) {
    return {
      icon: "slightly-smile",
      label: "Normal puls",
    };
  }
  return {
    icon: "smiley",
    label: "Låg puls",
  };
};
