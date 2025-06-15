import { Fontisto } from "@expo/vector-icons";
import { Colors, ColorSchemeName } from "@/theme/Colors";
import { CardStatus } from "@/types/cards";
import { getSoundLevelStatus } from "./soundLevelUtils";
import {
  getCO2Status,
  getPropaneStatus,
  getSmokeStatus,
} from "./airQualityUtils";
import { getPulseStatus } from "./pulseUtils";

export const getStatusIcon = (iconName: string, size: number = 64) => {
  switch (iconName) {
    case "smiley":
      return <Fontisto name="smiley" size={size} />;
    case "frowning":
      return <Fontisto name="frowning" size={size} />;
    case "slightly-smile":
    default:
      return <Fontisto name="slightly-smile" size={size} />;
  }
};

export const getCardStatus = (type: string, data: any): CardStatus => {
  if (type === "airQuality") {
    const statuses = [
      getSmokeStatus(data.smoke),
      getCO2Status(data.co2),
      getPropaneStatus(data.propane),
    ];

    if (statuses.some((s) => s.icon === "frowning")) return "bad";
    if (statuses.every((s) => s.icon === "smiley")) return "good";
    return "normal";
  }

  if (type === "soundLevel") {
    const status = getSoundLevelStatus(data.soundLevel);
    return status.icon === "frowning"
      ? "bad"
      : status.icon === "smiley"
        ? "good"
        : "normal";
  }

  if (type === "pulse") {
    const status = getPulseStatus(data.pulse);
    return status.icon === "frowning"
      ? "bad"
      : status.icon === "smiley"
        ? "good"
        : "normal";
  }

  return "normal";
};

export const getBackgroundColor = (
  status: CardStatus,
  colorScheme: ColorSchemeName
) => {
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  switch (status) {
    case "good":
      return colors.success;
    case "bad":
      return colors.error;
    default:
      return colors.neutral;
  }
};

export const getIconNameFromStatus = (status: CardStatus): string => {
  switch (status) {
    case "good":
      return "smiley";
    case "bad":
      return "frowning";
    default:
      return "slightly-smile";
  }
};
