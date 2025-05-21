import { SoundLevelApiResponse } from "@/services/fetchSoundLevel";

// Cache for mock data
let cachedData: SoundLevelApiResponse | null = null;
let lastFetchTime = 0;
const UPDATE_INTERVAL = 30000;

const generateMockSoundLevelData = (): SoundLevelApiResponse => {
  const now = Date.now();

  // Only generate new data if 30 seconds have passed or we have no cached data
  if (cachedData === null || now - lastFetchTime >= UPDATE_INTERVAL) {
    const soundLevel = Math.floor(Math.random() * 141);

    cachedData = {
      message: "values were fetched",
      value: [
        {
          id: new Date().toISOString(),
          soundLevel: soundLevel,
        },
      ],
    };

    lastFetchTime = now;
    console.log("Generated new sound level data:", soundLevel);
  } else {
    console.log(
      "Returning cached data, next update in",
      Math.ceil((UPDATE_INTERVAL - (now - lastFetchTime)) / 1000),
      "seconds"
    );
  }

  return cachedData;
};

export default generateMockSoundLevelData;