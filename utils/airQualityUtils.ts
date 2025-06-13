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

// Add the general air quality status function for SensorIndicator compatibility
export const getAirQualityStatus = (
  value: number,
  sensorType: "co2" | "propane" | "smoke"
): "good" | "bad" | "normal" => {
  switch (sensorType) {
    case "co2":
      if (value >= 1200) return "bad";
      if (value >= 800) return "normal";
      return "good";

    case "propane":
      if (value >= 800) return "bad";
      if (value >= 400) return "normal";
      return "good";

    case "smoke":
      if (value >= 300) return "bad";
      if (value >= 100) return "normal";
      return "good";

    default:
      return "normal";
  }
};
