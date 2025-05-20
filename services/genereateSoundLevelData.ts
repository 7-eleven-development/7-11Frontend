import { SoundLevelApiResponse } from "@/services/fetchSoundLevel";

// Cache for mock data
let cachedData: SoundLevelApiResponse | null = null;
let cachedHourlyData: any[] | null = null;
let cachedWeeklyData: any[] | null = null;
let cachedMonthlyData: any[] | null = null;
let lastFetchTime = 0;
let lastHistoryFetchTime = 0;
const UPDATE_INTERVAL = 30000;
const HISTORY_UPDATE_INTERVAL = 60000; // 1 minute for historical data

export interface HistoricalDataPoint {
  value: number;
  label: string;
  dataPointText?: string;
  timestamp?: string;
}

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

export const generateWeeklySoundLevelData = (): HistoricalDataPoint[] => {
  const now = Date.now();

  // Return cached data if it exists and hasn't expired
  if (
    cachedWeeklyData &&
    now - lastHistoryFetchTime < HISTORY_UPDATE_INTERVAL
  ) {
    return cachedWeeklyData;
  }

  // Generate new weekly data
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  const reorderedDays = [
    ...days.slice(today === 0 ? 6 : today - 1),
    ...days.slice(0, today === 0 ? 6 : today - 1),
  ];

  cachedWeeklyData = reorderedDays.map((day, index) => {
    // Create timestamp for each day
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      value: Math.floor(Math.random() * 40) + 40, // Random dB between 40-80
      label: day,
      dataPointText: "",
      timestamp: date.toISOString(),
    };
  });

  lastHistoryFetchTime = now;
  console.log("Generated new weekly sound level data");

  return cachedWeeklyData;
};

export const generateMonthlySoundLevelData = (): HistoricalDataPoint[] => {
  const now = Date.now();

  // Return cached data if it exists and hasn't expired
  if (
    cachedMonthlyData &&
    now - lastHistoryFetchTime < HISTORY_UPDATE_INTERVAL
  ) {
    return cachedMonthlyData;
  }

  // Generate new monthly data (30 days)
  const today = new Date();

  cachedMonthlyData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (29 - i));

    const dayNumber = date.getDate();

    return {
      value: Math.floor(Math.random() * 45) + 35, // Random dB between 35-80
      label: `${dayNumber}`,
      dataPointText: "",
      timestamp: date.toISOString(),
    };
  });

  lastHistoryFetchTime = now;
  console.log("Generated new monthly sound level data");

  return cachedMonthlyData;
};

export const generateHourlySoundLevelData = (): HistoricalDataPoint[] => {
  const now = Date.now();

  // Return cached data if it exists and hasn't expired
  if (
    cachedHourlyData &&
    now - lastHistoryFetchTime < HISTORY_UPDATE_INTERVAL
  ) {
    return cachedHourlyData;
  }

  // Generate new hourly data for hours 00-23 in sequence
  cachedHourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = i; // Simply use the index (0-23) as the hour
    const date = new Date();
    date.setHours(hour, 0, 0, 0);

    // Format as 24-hour clock: "00", "01", ... "23"
    const hourLabel = hour.toString().padStart(2, "0");

    return {
      value: Math.floor(Math.random() * 50) + 30, // Random dB between 30-80
      label: hourLabel, // Always include the hour label
      dataPointText: "",
      timestamp: date.toISOString(),
    };
  });

  lastHistoryFetchTime = now;
  console.log("Generated new hourly sound level data");

  return cachedHourlyData;
};

export default generateMockSoundLevelData;
