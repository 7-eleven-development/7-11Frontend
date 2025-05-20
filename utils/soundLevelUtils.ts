import { SoundLevelStatus } from "@/types/soundLevel";

export const getSoundLevelStatus = (soundValue: number): SoundLevelStatus => {
  if (soundValue >= 85) {
    return {
      icon: "frowning",
      label: "Loud",
    };
  }
  if (soundValue >= 60) {
    return {
      icon: "slightly-smile",
      label: "Moderate",
    };
  }
  return {
    icon: "smiley",
    label: "Quiet",
  };
};
