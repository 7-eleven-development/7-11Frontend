export interface BaseSensorConfig {
  title: string;
  unit: string;
  dangerThreshold: number;
  maxValue: number;
  type: string;
}

export interface AirQualitySensorConfig extends BaseSensorConfig {
  key: "co2" | "propane" | "smoke";
  warningThreshold: number;
}

export const AIR_QUALITY_SENSORS: Record<string, AirQualitySensorConfig> = {
  co2: {
    key: "co2",
    title: "CO2 Nivåer",
    unit: "ppm",
    dangerThreshold: 1000,
    warningThreshold: 700,
    maxValue: 2000,
    type: "CO2",
  },
  propane: {
    key: "propane",
    title: "Propan Nivåer",
    unit: "ppm",
    dangerThreshold: 500,
    warningThreshold: 350,
    maxValue: 1000,
    type: "propan",
  },
  smoke: {
    key: "smoke",
    title: "Rök Nivåer",
    unit: "ppm",
    dangerThreshold: 150,
    warningThreshold: 100,
    maxValue: 300,
    type: "rök",
  },
};

export const SOUND_LEVEL_CONFIG: BaseSensorConfig = {
  title: "Ljudnivå",
  unit: "dB",
  dangerThreshold: 100,
  maxValue: 120,
  type: "ljudnivå",
};

export const PULSE_CONFIG: BaseSensorConfig = {
  title: "Puls",
  unit: "BPM",
  dangerThreshold: 100,
  maxValue: 200,
  type: "puls",
};
