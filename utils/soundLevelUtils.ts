import { SoundLevelStatus } from "@/types/soundLevel";

export const getSoundLevelStatus = (soundValue: number): SoundLevelStatus => {
  if (soundValue >= 85) {
    return {
      icon: "frowning",
      label: "hög ljudnivå",
    };
  }
  if (soundValue >= 60) {
    return {
      icon: "slightly-smile",
      label: "normal ljudnivå",
    };
  }
  return {
    icon: "smiley",
    label: "låg ljudnivå",
  };
};

export const getSoundLevelIndicatorStatus = (
  value: number
): "good" | "bad" | "normal" => {
  if (value >= 85) return "bad";
  if (value >= 60) return "normal";
  return "good";
};
