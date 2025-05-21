import { API_URL } from "./api";

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
};
