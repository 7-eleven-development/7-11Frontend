import { API_URL } from "./api";
import mockAirQualityData from "@/services/airQualityData.json";
import { HistoricalDataPoint } from "@/types/historicalData";

export const airQualityServices = {
  fetchLatestAirQuality: async (token: string, device: string) => {
    try {
      const response = await fetch(
        `${API_URL}/airquality/${device}/latest-data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
  fetchWeeklyAirQualityData: async (): Promise<HistoricalDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAirQualityData.weekly_trend;
  },

  fetchMonthlyAirQualityData: async (): Promise<HistoricalDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockAirQualityData.monthly_trend;
  },
};
