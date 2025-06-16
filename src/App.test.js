import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock child components to simplify testing
jest.mock("./Components/Custom/Header/Header", () => {
  return function MockHeader({ darkMode, setDarkMode }) {
    return (
      <div data-testid="mock-header">
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      </div>
    );
  };
});

jest.mock("./Components/Custom/WelcomPage/WelcomePage", () => {
  return function MockWelcomePage() {
    return <div data-testid="mock-welcome-page">Welcome Page</div>;
  };
});

jest.mock("./Components/Custom/QuizPage/QuizPage", () => {
  return function MockQuizPage() {
    return <div data-testid="mock-quiz-page">Quiz Page</div>;
  };
});

jest.mock("./Components/Custom/ResultPage/ResultPage", () => {
  return function MockResultPage() {
    return <div data-testid="mock-result-page">Result Page</div>;
  };
});

// Wrap App with necessary providers for testing
const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("App Component", () => {
  beforeEach(() => {
    // Clear any previous state
    window.history.pushState({}, "", "/");
  });

  test("renders without crashing", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Initial render HTML:", container.innerHTML);
    expect(container).toBeTruthy();
  });

  test("renders Header component", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Header test HTML:", container.innerHTML);
    const header = screen.getByTestId("mock-header");
    expect(header).toBeInTheDocument();
  });

  test("renders WelcomePage by default", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Welcome page test HTML:", container.innerHTML);
    const welcomePage = screen.getByTestId("mock-welcome-page");
    expect(welcomePage).toBeInTheDocument();
  });

  test("toggles dark mode when switch is clicked", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Dark mode test initial HTML:", container.innerHTML);

    // Get the body element
    const body = document.querySelector(".body");
    console.log("Initial body class:", body?.className);

    // Click the dark mode toggle
    const toggleButton = screen.getByText("Toggle Dark Mode");
    fireEvent.click(toggleButton);

    // Check if dark mode class was added
    console.log("Body class after toggle:", body?.className);
    expect(body).toHaveClass("dark-mode");

    // Toggle back to light mode
    fireEvent.click(toggleButton);
    console.log("Body class after second toggle:", body?.className);
    expect(body).not.toHaveClass("dark-mode");
  });

  test("navigates to quiz page after selecting topic", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Initial URL:", window.location.href);

    // Select a topic
    const selectTopicButton = screen.getByText("Select Topic");
    expect(selectTopicButton).toBeInTheDocument();
    fireEvent.click(selectTopicButton);

    // Should navigate to quiz page
    const quizPage = screen.getByTestId("mock-quiz-page");
    expect(quizPage).toBeInTheDocument();
  });
});

describe("QuizGuard Component", () => {
  beforeEach(() => {
    // Clear any previous state
    window.history.pushState({}, "", "/");
  });

  test("redirects to home when no topic is selected", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Initial URL:", window.location.href);

    // Try to access quiz page directly
    window.history.pushState({}, "", "/quiz/test");
    console.log("After pushState URL:", window.location.href);

    // Should redirect to home
    const welcomePage = screen.getByTestId("mock-welcome-page");
    expect(welcomePage).toBeInTheDocument();
  });

  test("allows access to quiz page when topic is selected", () => {
    const { container } = renderWithRouter(<App />);
    console.log("Initial URL:", window.location.href);

    // Select a topic
    const selectTopicButton = screen.getByText("Select Topic");
    expect(selectTopicButton).toBeInTheDocument();
    fireEvent.click(selectTopicButton);

    // Should show quiz page
    const quizPage = screen.getByTestId("mock-quiz-page");
    expect(quizPage).toBeInTheDocument();
  });
});
