import { ReactNode, useMemo, useCallback } from "react";
import ChartContext from "./ChartContext";
import useUserContext from "@/context/user/useUserContext";
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import { HistoricalDataPoint } from "@/types/historicalData";
import { ChartDataPoint, ChartTimeRange } from "@/types/chart";
import {
  DEFAULT_CHART_CONFIG,
  DEFAULT_POINTER_CONFIG,
  CHART_TYPE_CONFIGS,
} from "@/utils/config/chartConfigs";
import { getChartColors } from "@/utils/chartUtils";

interface ChartProviderProps {
  children: ReactNode;
  chartType?: keyof typeof CHART_TYPE_CONFIGS;
}

const ChartProvider = ({ children, chartType }: ChartProviderProps) => {
  const { actualTheme: colorScheme } = useUserContext();

  const transformChartData = useCallback(
    <T extends HistoricalDataPoint>(
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

      return sortedData.map((item) => {
        const date = parseISO(item.created_at);
        const label =
          timeRange === "weekly"
            ? format(date, "EEE", { locale: sv })
            : format(date, "d/M", { locale: sv });

        const value = Number(item[valueKey]);

        return {
          value,
          label,
          dataPointRadius: 4,
        };
      });
    },
    []
  );

  const prepareChartData = useCallback(
    <T extends HistoricalDataPoint>(
      weeklyData: T[],
      monthlyData: T[],
      timeRange: ChartTimeRange,
      valueKey: string
    ): ChartDataPoint[] => {
      const data = timeRange === "monthly" ? monthlyData : weeklyData;
      const transformed = transformChartData(data, timeRange, valueKey);

      if (timeRange === "monthly") {
        return transformed.map((item, index) => {
          const position = index + 1;
          const shouldShowLabel = position === 1 || position % 5 === 0;

          return {
            ...item,
            label: shouldShowLabel ? item.label : "",
            originalLabel: item.label,
          };
        });
      }

      return transformed.map((item) => ({
        ...item,
        originalLabel: item.label,
      }));
    },
    [transformChartData]
  );

  const value = useMemo(() => {
    const colors = getChartColors(colorScheme);

    const typeSpecificConfig = chartType ? CHART_TYPE_CONFIGS[chartType] : {};
    const mergedConfig = { ...DEFAULT_CHART_CONFIG, ...typeSpecificConfig };

    const chartConfig = {
      ...mergedConfig,
      color: colors.chart,
      startFillColor: colors.chart,
      endFillColor: colors.fill,
      yAxisTextStyle: { color: colors.text },
      xAxisLabelTextStyle: {
        color: colors.text,
        fontSize: 10,
        marginTop: 6,
      },
      xAxisColor: colors.grid,
      yAxisColor: colors.grid,
      yAxisTextNumberOfLines: 1,
      rulesColor: colors.grid,
      dataPointsColor: colors.chart,
    };

    const pointerConfig = {
      ...DEFAULT_POINTER_CONFIG,
      pointerStripColor: colors.pointer,
      pointerColor: colors.chart,
    };

    return {
      textColor: colors.text,
      gridColor: colors.grid,
      chartColor: colors.chart,
      chartFillColor: colors.fill,
      chartConfig,
      pointerConfig,
      colorScheme,
      prepareChartData,
      transformChartData,
    };
  }, [colorScheme, prepareChartData, transformChartData, chartType]);

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};

export default ChartProvider;
