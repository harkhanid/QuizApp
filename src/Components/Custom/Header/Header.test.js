import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

// Mock the CustomSwitch component
jest.mock("../../Reusable/CustomSwich/CustomSwitch", () => {
  return function MockCustomSwitch({ darkMode, onChangeFn }) {
    return (
      <button data-testid="mock-switch" onClick={onChangeFn}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </button>
    );
  };
});

// Helper function to render with router
const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Header Component", () => {
  const mockSetDarkMode = jest.fn();
  const defaultProps = {
    topic: null,
    darkMode: false,
    setDarkMode: mockSetDarkMode,
  };

  beforeEach(() => {
    mockSetDarkMode.mockClear();
  });

  test("renders without topic", () => {
    const { container } = renderWithRouter(<Header {...defaultProps} />);
    console.log("Container HTML:", container.innerHTML);

    // Should show both mobile and desktop switches
    const switches = screen.getAllByTestId("mock-switch");
    expect(switches).toHaveLength(2);

    // Should show sun and moon icons
    const sunIcon = screen.getByAltText("sun icon");
    const moonIcon = screen.getByAltText("moon icon");
    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
  });

  test("renders with topic", () => {
    const topicProps = {
      ...defaultProps,
      topic: {
        title: "Test Topic",
        iconBg: "#FFFFFF",
      },
    };

    const { container } = renderWithRouter(<Header {...topicProps} />);
    console.log("Container HTML with topic:", container.innerHTML);

    // Should show topic title
    const topicTitle = screen.getByText("Test Topic");
    expect(topicTitle).toBeInTheDocument();

    // Should show topic icon container
    const iconContainer = screen.getByAltText("topic icon").parentElement;
    console.log("Icon container:", iconContainer);
    expect(iconContainer).toHaveStyle({ backgroundColor: "#FFFFFF" });
  });

  test("toggles dark mode when switch is clicked", () => {
    const { container } = renderWithRouter(<Header {...defaultProps} />);
    console.log("Initial container HTML:", container.innerHTML);

    // Get both switches (mobile and desktop)
    const switches = screen.getAllByTestId("mock-switch");
    expect(switches).toHaveLength(2);

    // Click mobile switch
    fireEvent.click(switches[0]);
    expect(mockSetDarkMode).toHaveBeenCalledTimes(1);

    // Click desktop switch
    fireEvent.click(switches[1]);
    expect(mockSetDarkMode).toHaveBeenCalledTimes(2);
  });

  test("shows correct icons based on dark mode", () => {
    const { container, rerender } = renderWithRouter(
      <Header {...defaultProps} />
    );
    console.log("Initial container HTML:", container.innerHTML);

    // Light mode icons
    const sunIcon = screen.getByAltText("sun icon");
    const moonIcon = screen.getByAltText("moon icon");
    console.log("Sun icon src:", sunIcon.src);
    console.log("Moon icon src:", moonIcon.src);

    expect(sunIcon).toHaveAttribute(
      "src",
      expect.stringContaining("sun-dark.svg")
    );
    expect(moonIcon).toHaveAttribute(
      "src",
      expect.stringContaining("moon-dark.svg")
    );

    // Switch to dark mode
    rerender(
      <MemoryRouter>
        <Header {...defaultProps} darkMode={true} />
      </MemoryRouter>
    );
    console.log("After dark mode container HTML:", container.innerHTML);

    // Dark mode icons
    expect(sunIcon).toHaveAttribute(
      "src",
      expect.stringContaining("sun-light.svg")
    );
    expect(moonIcon).toHaveAttribute(
      "src",
      expect.stringContaining("moon-light.svg")
    );
  });
});
