import { API_URL } from "./api";

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const locationService = {
  fetchLatestPosition: async (token: string, device: string) => {
    try {
      const response = await fetch(`${API_URL}/gps/${device}/latest-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export const getLocationNameOSM = async (
  lat: number,
  lon: number
): Promise<string> => {
  try {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      {
        headers: {
          "User-Agent": "ChasChallenge/1.0 (chas-challenge-app)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.address) {
      const locationName =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.municipality ||
        data.address.county;

      if (locationName) {
        return locationName;
      }

      return data.display_name;
    }

    return "Okänd plats";
  } catch (error) {
    console.error("Geocoding error:", error);
    return "Okänd plats";
  }
};
