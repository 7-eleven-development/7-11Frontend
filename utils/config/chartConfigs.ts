export interface ChartConfig {
  height: number;
  width: number;
  spacing: number;
  thickness: number;
  startOpacity: number;
  endOpacity: number;
  initialSpacing: number;
  endSpacing: number;
  hideRules: boolean;
  hideYAxisText: boolean;
  rulesType: "solid" | "dashed" | "dotted";
  xAxisLabelsHeight: number;
  maxValue: number;
  showValuesAsDataPointsText: boolean;
}

export interface PointerConfig {
  activatePointersOnLongPress: boolean;
  autoAdjustPointerLabelPosition: boolean;
}

export const DEFAULT_CHART_CONFIG: ChartConfig = {
  height: 280,
  width: 300,
  spacing: 40,
  thickness: 2,
  startOpacity: 0.7,
  endOpacity: 0.1,
  initialSpacing: 16,
  endSpacing: 16,
  hideRules: true,
  hideYAxisText: false,
  rulesType: "solid",
  xAxisLabelsHeight: 20,
  maxValue: 120,
  showValuesAsDataPointsText: false,
};

export const DEFAULT_POINTER_CONFIG: PointerConfig = {
  activatePointersOnLongPress: true,
  autoAdjustPointerLabelPosition: true,
};

export const CHART_TYPE_CONFIGS: Record<string, Partial<ChartConfig>> = {
  pulse: {
    maxValue: 200,
  },
  soundLevel: {
    maxValue: 120,
  },
  co2: {
    maxValue: 2000,
  },
  propane: {
    maxValue: 1000,
  },
  smoke: {
    maxValue: 300,
  },
};
