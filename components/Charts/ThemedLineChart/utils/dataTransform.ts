import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import { HistoricalDataPoint } from "@/types/historicalData";
import { ChartDataPoint, ChartTimeRange } from "@/types/chart";

export const transformChartData = <T extends HistoricalDataPoint>(
  data: T[],
  timeRange: "weekly" | "monthly",
  valueKey: string
) => {
  if (!data || data.length === 0) {
    return [];
  }

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return sortedData.map((item, index) => {
    const date = parseISO(item.created_at);
    let label = "";

    if (timeRange === "weekly") {
      label = format(date, "EEE", { locale: sv });
    } else {
      label = format(date, "d/M", { locale: sv });
    }

    const value = Number(item[valueKey]);

    return {
      value,
      label,
      dataPointRadius: 4,
    };
  });
};

export const prepareChartData = <T extends HistoricalDataPoint>(
  weeklyData: T[],
  monthlyData: T[],
  timeRange: ChartTimeRange,
  valueKey: string
): ChartDataPoint[] => {
  const data = timeRange === "monthly" ? monthlyData : weeklyData;
  const transformed = transformChartData(data, timeRange, valueKey);

  // For monthly view, modify the displayLabel property while keeping original label intact
  if (timeRange === "monthly") {
    return transformed.map((item, index) => {
      const position = index + 1;
      const shouldShowLabel = position === 1 || position % 5 === 0;

      return {
        ...item,
        // This is what the chart will display
        label: shouldShowLabel ? item.label : "",
        // Keep the original label for hover functionality
        originalLabel: item.label,
      };
    });
  }

  // For weekly, no changes needed
  return transformed.map((item) => ({
    ...item,
    originalLabel: item.label,
  }));
};
