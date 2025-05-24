import { useState, useEffect } from "react";
import { ChartTimeRange, HoverItem } from "@/types/chart";

export const useChartInteraction = () => {
  const [timeRange, setTimeRange] = useState<ChartTimeRange>("weekly");
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string>("");

  useEffect(() => {
    setHoveredValue(null);
    setHoveredLabel("");
  }, [timeRange]);

  const handlePointerLabelComponent = (items: HoverItem[]) => {
    if (items && items.length > 0 && items[0]) {
      requestAnimationFrame(() => {
        setHoveredValue(items[0].value);
        setHoveredLabel(items[0].originalLabel || items[0].label || "");
      });
    }
  };

  return {
    timeRange,
    setTimeRange,
    hoveredValue,
    hoveredLabel,
    handlePointerLabelComponent,
  };
};
