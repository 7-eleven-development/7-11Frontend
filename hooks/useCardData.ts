import { useMemo } from "react";
import { getCardStatus } from "@/utils/cardUtils";
import { CardData } from "@/types/cards";

interface HomeData {
  pulse: { value: number };
  soundLevel: { value: number };
  airQuality: {
    propane: number;
    smoke: number;
    co2: number;
  };
}

export const useCardData = (homeData: HomeData): CardData[] => {
  const { pulse, soundLevel, airQuality } = homeData;

  return useMemo(
    () => [
      {
        type: "soundLevel" as const,
        data: { soundLevel: soundLevel.value },
        status: getCardStatus("soundLevel", { soundLevel: soundLevel.value }),
      },
      {
        type: "pulse" as const,
        data: { pulse: pulse.value },
        status: getCardStatus("pulse", { pulse: pulse.value }),
      },
      {
        type: "airQuality" as const,
        data: {
          propane: airQuality.propane,
          smoke: airQuality.smoke,
          co2: airQuality.co2,
        },
        status: getCardStatus("airQuality", {
          propane: airQuality.propane,
          smoke: airQuality.smoke,
          co2: airQuality.co2,
        }),
      },
    ],
    [
      pulse.value,
      soundLevel.value,
      airQuality.propane,
      airQuality.smoke,
      airQuality.co2,
    ]
  );
};
