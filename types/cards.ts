export type CardStatus = "good" | "bad" | "normal";

export interface BaseCardData {
  status: CardStatus;
}

export interface AirQualityData extends BaseCardData {
  type: "airQuality";
  data: {
    smoke: number;
    propane: number;
    co2: number;
  };
}

export interface SoundLevelData extends BaseCardData {
  type: "soundLevel";
  data: {
    soundLevel: number;
  };
}

export interface PulseData extends BaseCardData {
  type: "pulse";
  data: {
    pulse: number;
  };
}

export type CardData = AirQualityData | SoundLevelData | PulseData;
