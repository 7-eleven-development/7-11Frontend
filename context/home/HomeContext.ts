import { createContext } from "react";
import { HomeContextType } from "@/types/home";

export const HomeContext = createContext<HomeContextType>({
  homeData: {
    location: {
      name: "",
      lat: 0,
      lon: 0,
    },
    temperature: 0,
    pulse: {
      icon: "slightly-smile",
      label: "",
      value: 0,
    },
    soundLevel: {
      icon: "slightly-smile",
      label: "",
      value: 0,
    },
    airQuality: 0,
  },
  isLoading: false,
  error: null,
  refreshData: async () => {},
});
