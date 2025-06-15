import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { createElement, JSX } from "react";

export interface TabConfigItem {
  name: string;
  title: string;
  icon: ({
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  }) => JSX.Element;
}

export const TAB_CONFIG: TabConfigItem[] = [
  {
    name: "index",
    title: "Hem",
    icon: ({ color, focused }) =>
      createElement(Ionicons, {
        name: focused ? "home" : "home-outline",
        size: 24,
        color: color,
        accessibilityLabel: focused ? "Hem, vald flik" : "Hem flik",
        accessibilityRole: "tab",
        accessibilityState: { selected: focused },
      }),
  },
  {
    name: "location",
    title: "Plats",
    icon: ({ color, focused }) =>
      createElement(AntDesign, {
        name: focused ? "enviroment" : "enviromento",
        size: 24,
        color: color,
        accessibilityLabel: focused ? "Plats, vald flik" : "Plats flik",
        accessibilityRole: "tab",
        accessibilityState: { selected: focused },
      }),
  },
  {
    name: "sound-level",
    title: "Ljudnivå",
    icon: ({ color, focused }) =>
      createElement(Ionicons, {
        name: focused ? "headset" : "headset-outline",
        size: 24,
        color: color,
        accessibilityLabel: focused ? "Ljudnivå, vald flik" : "Ljudnivå flik",
        accessibilityRole: "tab",
        accessibilityState: { selected: focused },
      }),
  },
  {
    name: "air-quality",
    title: "Luftkvalitet",
    icon: ({ color, focused }) =>
      createElement(Entypo, {
        name: "air",
        size: 24,
        color: color,
        accessibilityLabel: focused
          ? "Luftkvalitet, vald flik"
          : "Luftkvalitet flik",
        accessibilityRole: "tab",
        accessibilityState: { selected: focused },
      }),
  },
  {
    name: "Pulse",
    title: "Puls",
    icon: ({ color, focused }) =>
      createElement(AntDesign, {
        name: focused ? "heart" : "hearto",
        size: 24,
        color: color,
        accessibilityLabel: focused ? "Puls, vald flik" : "Puls flik",
        accessibilityRole: "tab",
        accessibilityState: { selected: focused },
      }),
  },
];
