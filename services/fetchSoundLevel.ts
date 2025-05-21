export interface SoundLevelApiResponse {
  message: string;
  value: {
    id: string;
    soundLevel: number;
  }[];
}

export const soundLevelService = {
  async fetchSoundLevel(token: string): Promise<any> {
    try {
      const response = await fetch(
        "https://chas-challenge.vercel.app/api/sound/device2/trend",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: SoundLevelApiResponse = await response.json();
      console.log("Sound level data:", data);
    } catch (error) {
      console.error("Error fetching sound level data:", error);
      throw error;
    }
  },
};
