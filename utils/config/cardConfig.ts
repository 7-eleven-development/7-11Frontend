import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { createElement } from "react";

export const CARD_CONFIG = {
  airQuality: {
    title: "Luftkvalitet",
    icon: () =>
      createElement(Entypo, { name: "air", size: 32, color: "black" }),
    route: "/(tabs)/air-quality" as const,
  },
  soundLevel: {
    title: "Ljudnivå",
    icon: () =>
      createElement(Ionicons, {
        name: "headset-outline",
        size: 32,
        color: "black",
      }),
    route: "/(tabs)/sound-level" as const,
  },
  pulse: {
    title: "Puls",
    icon: () =>
      createElement(AntDesign, { name: "hearto", size: 32, color: "black" }),
    route: "/(tabs)/Pulse" as const,
  },
} as const;

export type CardType = keyof typeof CARD_CONFIG;
