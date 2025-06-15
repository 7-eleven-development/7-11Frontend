import { HistoricalDataPoint } from "@/types/historicalData";
export type ChartTimeRange = "weekly" | "monthly";

export interface ChartContextType {
  textColor: string;
  gridColor: string;
  chartColor: string;
  chartFillColor: string;
  chartConfig: any;
  pointerConfig: any;
  colorScheme: "light" | "dark";
  prepareChartData: <T extends HistoricalDataPoint>(
    weeklyData: T[],
    monthlyData: T[],
    timeRange: "weekly" | "monthly",
    valueKey: string
  ) => ChartDataPoint[];
  transformChartData: <T extends HistoricalDataPoint>(
    data: T[],
    timeRange: "weekly" | "monthly",
    valueKey: string
  ) => any[];
}

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
