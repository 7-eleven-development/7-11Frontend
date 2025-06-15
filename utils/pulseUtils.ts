import { PulseStatus } from "@/types/pulse";

export const getPulseStatus = (pulseValue: number): PulseStatus => {
  if (pulseValue >= 100 || pulseValue <= 50) {
    return {
      icon: "frowning",
      label: pulseValue >= 100 ? "Hög puls" : "Låg puls",
    };
  }
  if (pulseValue >= 90 || pulseValue <= 60) {
    return {
      icon: "slightly-smile",
      label: "Normal puls",
    };
  }
  return {
    icon: "smiley",
    label: "Optimal puls",
  };
};

export const getPulseIndicatorStatus = (
  value: number
): "good" | "bad" | "normal" => {
  if (value >= 100 || value <= 50) return "bad";
  if (value >= 90 || value <= 60) return "normal";
  return "good";
};
