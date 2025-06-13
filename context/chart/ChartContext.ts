import { createContext } from "react";
import { ChartContextType } from "@/types/chart";
import { ChartDataPoint } from "@/types/chart";
import { HistoricalDataPoint } from "@/types/historicalData";

const defaultPrepareChartData = <T extends HistoricalDataPoint>(
  weeklyData: T[],
  monthlyData: T[],
  timeRange: "weekly" | "monthly",
  valueKey: string
): ChartDataPoint[] => [];

const defaultTransformChartData = () => []; // Adjust return type as needed

const ChartContext = createContext<ChartContextType>({
  textColor: "",
  gridColor: "",
  chartColor: "",
  chartFillColor: "",
  chartConfig: {},
  pointerConfig: {},
  colorScheme: "light",
  prepareChartData: defaultPrepareChartData,
  transformChartData: defaultTransformChartData,
});

export default ChartContext;
