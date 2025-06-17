import { renderHook, act } from "@testing-library/react-native";
import { useChartInteraction } from "../useChartInteraction";

describe("useChartInteraction", () => {
  const mockItems = {
    single: { value: 100, label: "Test", originalLabel: "Original" },
    withOriginalLabel: {
      value: 75,
      label: "Test Label",
      originalLabel: "Original Label",
    },
    fallbackLabel: { value: 50, label: "Fallback Label" },
    noLabels: { value: 42 } as any,
    first: { value: 100, label: "First", originalLabel: "First Original" },
    second: { value: 200, label: "Second", originalLabel: "Second Original" },
  };

  const renderChartInteraction = () => {
    return renderHook(() => useChartInteraction());
  };

  const simulatePointerInteraction = async (result: any, items: any[]) => {
    await act(async () => {
      result.current.handlePointerLabelComponent(items);
      jest.runAllTimers();
    });
  };

  const expectDefaultState = (result: any) => {
    expect(result.current.timeRange).toBe("weekly");
    expect(result.current.hoveredValue).toBeNull();
    expect(result.current.hoveredLabel).toBe("");
  };

  const expectHoverValuesReset = (result: any) => {
    expect(result.current.hoveredValue).toBeNull();
    expect(result.current.hoveredLabel).toBe("");
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initialize with default values", () => {
    const { result } = renderChartInteraction();
    expectDefaultState(result);
  });

  it("should reset hover values when timeRange changes", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, [mockItems.single]);

    expect(result.current.hoveredValue).toBe(100);
    expect(result.current.hoveredLabel).toBe("Original");

    act(() => {
      result.current.setTimeRange("monthly");
    });

    expectHoverValuesReset(result);
    expect(result.current.timeRange).toBe("monthly");
  });

  it("should update hovered values with requestAnimationFrame", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, [mockItems.withOriginalLabel]);

    expect(result.current.hoveredValue).toBe(75);
    expect(result.current.hoveredLabel).toBe("Original Label");
  });

  it("should handle empty items array", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, []);

    expect(result.current.hoveredValue).toBeNull();
    expect(result.current.hoveredLabel).toBe("");
  });

  it("should use label when originalLabel is not available", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, [mockItems.fallbackLabel]);

    expect(result.current.hoveredValue).toBe(50);
    expect(result.current.hoveredLabel).toBe("Fallback Label");
  });

  it("should use first item when multiple items provided", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, [
      mockItems.first,
      mockItems.second,
    ]);

    expect(result.current.hoveredValue).toBe(100);
    expect(result.current.hoveredLabel).toBe("First Original");
  });

  it("should handle item with no label properties", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, [mockItems.noLabels]);

    expect(result.current.hoveredValue).toBe(42);
    expect(result.current.hoveredLabel).toBe("");
  });

  it("should handle null or undefined items", async () => {
    const { result } = renderChartInteraction();

    await simulatePointerInteraction(result, null as any);
    expect(result.current.hoveredValue).toBeNull();
    expect(result.current.hoveredLabel).toBe("");

    await simulatePointerInteraction(result, undefined as any);
    expect(result.current.hoveredValue).toBeNull();
    expect(result.current.hoveredLabel).toBe("");
  });

  it("should handle consecutive calls correctly", async () => {
    const { result } = renderChartInteraction();

    // First call
    await simulatePointerInteraction(result, [mockItems.first]);
    expect(result.current.hoveredValue).toBe(100);

    // Second call should override
    await simulatePointerInteraction(result, [mockItems.second]);
    expect(result.current.hoveredValue).toBe(200);
    expect(result.current.hoveredLabel).toBe("Second Original");
  });
});
