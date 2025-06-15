import { API_URL } from "./api";
import mockSoundData from "@/services/soundData.json";
import { HistoricalDataPoint } from "@/types/historicalData";

export const soundLevelServices = {
  fetchLatestSoundLevel: async (token: string, device: string) => {
    try {
      const response = await fetch(`${API_URL}/sound/${device}/latest-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sound level data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching sound level data:", error);
      throw error;
    }
  },

  fetchWeeklySoundLevelData: async (): Promise<HistoricalDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockSoundData.weekly_trend;
  },

  fetchMonthlySoundLevelData: async (): Promise<HistoricalDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockSoundData.monthly_trend;
  },
};
