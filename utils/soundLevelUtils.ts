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
