import { PulseData } from "./pulse";
import { SoundLevelData } from "./soundLevel";

export interface HomeData {
  location: {
    name: string;
    lat: number;
    lon: number;
  };
  temperature: number;
  pulse: PulseData;
  soundLevel: SoundLevelData;
  airQuality: {
    smoke: number;
    propane: number;
    co2: number;
  };
}

export interface HomeContextType {
  homeData: HomeData;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}
