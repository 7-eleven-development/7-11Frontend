// Only types used in multiple places
export type ChartTimeRange = "weekly" | "monthly";

export interface ChartDataPoint {
  value: number;
  label: string;
  originalLabel?: string;
  dataPointRadius?: number;
  hideDataPointsText?: boolean;
}

export interface HoverItem {
  value: number;
  label?: string;
  originalLabel?: string;
}
