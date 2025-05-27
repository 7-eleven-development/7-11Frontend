export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface LocationContextType {
  locationData: LocationData | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}
