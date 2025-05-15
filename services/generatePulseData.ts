import { PulselApiResponse } from "@/services/fetchPulse";

// Cache for mock data
let cachedData: PulselApiResponse | null = null;
let lastFetchTime = 0;
const UPDATE_INTERVAL = 30000;

const generatePulseData = (): PulselApiResponse => {
  const now = Date.now();

  // Only generate new data if 30 seconds have passed or we have no cached data
  if (cachedData === null || now - lastFetchTime >= UPDATE_INTERVAL) {
    const pulse = Math.floor(Math.random() * 180);

    cachedData = {
      message: "values were fetched",
      value: [
        {
          id: new Date().toISOString(),
          pulse,
        },
      ],
    };

    lastFetchTime = now;
    console.log("Generated new sound level data:", pulse);
  } else {
    console.log(
      "Returning cached data, next update in",
      Math.ceil((UPDATE_INTERVAL - (now - lastFetchTime)) / 1000),
      "seconds"
    );
  }

  return cachedData;
};

export default generatePulseData;
