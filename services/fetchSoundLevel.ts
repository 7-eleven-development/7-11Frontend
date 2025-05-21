import generateMockSoundLevelData from "@/services/genereateSoundLevelData";

export interface SoundLevelApiResponse {
  message: string;
  value: {
    id: string;
    soundLevel: number;
  }[];
}

const fetchSoundLevel = async (): Promise<SoundLevelApiResponse> => {
  try {
    return generateMockSoundLevelData();
  } catch (error) {
    console.error("Error fetching sound level data:", error);
    throw error;
  }
};

export default fetchSoundLevel;
