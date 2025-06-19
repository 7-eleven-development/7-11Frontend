import { render } from "@testing-library/react-native";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/theme/Colors";

jest.mock("@/context/user/useUserContext", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    actualTheme: "light",
  })),
}));

describe("ThemedView", () => {
  const testId = "themed-view";
  const lightColor = Colors.light.background;
  const darkColor = Colors.dark.background;
  const customStyle = { padding: 10, margin: 5 };
  const customStyles = [{ padding: 10 }, { margin: 5 }];

  const renderThemedView = (props = {}) => {
    const result = render(<ThemedView testID={testId} {...props} />);
    const view = result.getByTestId(testId);
    return { ...result, view };
  };

  it("render with default props", () => {
    const { view } = renderThemedView();

    expect(view).toBeTruthy();
    expect(view.props.style[0]).toHaveProperty("backgroundColor");
  });

  it("applies correct backgroundColor from theme", () => {
    const { view } = renderThemedView();

    const backgroundColor = view.props.style[0].backgroundColor;
    expect(backgroundColor).toBe(lightColor);
  });

  it("uses lightColor when provided in light mode", () => {
    const { view } = renderThemedView({ lightColor });

    expect(view.props.style[0].backgroundColor).toBe(lightColor);
  });

  it("uses darkColor when provided but falls back in light mode", () => {
    const { view } = renderThemedView({ darkColor });

    expect(view.props.style[0].backgroundColor).toBe(lightColor);
  });

  it("uses both colors correctly based on theme mode", () => {
    const { view } = renderThemedView({ lightColor, darkColor });

    expect(view.props.style[0].backgroundColor).toBe(lightColor);
  });

  it("merges custom style with backgroundColor", () => {
    const { view } = renderThemedView({ style: customStyle });

    expect(view.props.style).toEqual([
      expect.objectContaining({ backgroundColor: expect.any(String) }),
      customStyle,
    ]);
  });

  it("passes through other ViewProps", () => {
    const { view } = renderThemedView({
      accessibilityLabel: "test-label",
      pointerEvents: "none",
    });

    expect(view.props.accessibilityLabel).toBe("test-label");
    expect(view.props.pointerEvents).toBe("none");
  });

  it("handles array styles correctly", () => {
    const { view } = renderThemedView({ style: customStyles });

    expect(view.props.style).toEqual([
      expect.objectContaining({ backgroundColor: expect.any(String) }),
      customStyles,
    ]);
  });

  it("handles undefined style gracefully", () => {
    const { view } = renderThemedView({ style: undefined });

    expect(view.props.style).toEqual([
      expect.objectContaining({ backgroundColor: expect.any(String) }),
      undefined,
    ]);
  });

  it("handles null style gracefully", () => {
    const { view } = renderThemedView({ style: null });

    expect(view.props.style).toEqual([
      expect.objectContaining({ backgroundColor: expect.any(String) }),
      null,
    ]);
  });
});
