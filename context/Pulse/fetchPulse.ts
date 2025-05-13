import generatePulseData from "./generatePulseData";

export interface PulselApiResponse {
  message: string;
  value: {
    id: string;
    pulse: number;
  }[];
}

const fetchSoundLevel = async (): Promise<PulselApiResponse> => {
  try {
    return generatePulseData();
  } catch (error) {
    console.error("Error fetching sound level data:", error);
    throw error;
  }
};

export default fetchSoundLevel;
