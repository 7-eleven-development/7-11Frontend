import { API_URL } from "@/services/api";

export const homeService = {
  async fetchCurrentData(device: string, token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/device/${device}/latest-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch current data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching current data:", error);
      throw error;
    }
  },
};

