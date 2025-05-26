import { CO2Status, PropaneStatus, SmokeStatus } from "@/types/airQuality";

export const getCO2Status = (co2Value: number): CO2Status => {
  if (co2Value >= 1200) {
    return {
      icon: "frowning",
      label: "Hög CO2-nivå",
    };
  }
  if (co2Value >= 800) {
    return {
      icon: "slightly-smile",
      label: "Normal CO2-nivå",
    };
  }
  return {
    icon: "smiley",
    label: "Låg CO2-nivå",
  };
};

export const getPropaneStatus = (propaneValue: number): PropaneStatus => {
  if (propaneValue >= 800) {
    return {
      icon: "frowning",
      label: "Hög propannivå",
    };
  }
  if (propaneValue >= 400) {
    return {
      icon: "slightly-smile",
      label: "Normal propannivå",
    };
  }
  return {
    icon: "smiley",
    label: "Låg propannivå",
  };
};

export const getSmokeStatus = (smokeValue: number): SmokeStatus => {
  if (smokeValue >= 300) {
    return {
      icon: "frowning",
      label: "Hög röknivå",
    };
  }
  if (smokeValue >= 100) {
    return {
      icon: "slightly-smile",
      label: "Måttlig röknivå",
    };
  }
  return {
    icon: "smiley",
    label: "Låg röknivå",
  };
};