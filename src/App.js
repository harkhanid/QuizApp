import "./App.css";
import { useState } from "react";
import Header from "./Components/Custom/Header/Header";
import QuizPage from "./Components/Custom/QuizPage/QuizPage";
import ResultPage from "./Components/Custom/ResultPage/ResultPage";
import WelcomePage from "./Components/Custom/WelcomPage/WelcomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/**
 * App Component
 * The root component of the quiz application.
 * Manages routing, dark mode state, and quiz topic selection.
 *
 * @component
 * @returns {React.ReactNode} The rendered application
 */

/**
 * QuizGuard Component
 * Protects quiz and result routes from direct access without a selected topic.
 * Redirects to home if no topic is selected.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.topic - The selected quiz topic
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {React.ReactNode} Either the children or a redirect to home
 */
const QuizGuard = ({ topic, children }) => {
  if (!topic) {
    // Redirect to home if topic is not set
    return <Navigate to="/" />;
  }
  return children;
};

/**
 * Main App Component
 * Manages the application state and routing
 * @returns {React.ReactNode} The main application component
 */
function App() {
  // State management for dark mode, quiz progress, and topic selection
  const [darkMode, setDarkMode] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [topic, setTopic] = useState(null);

  // Material-UI theme configuration
  const theme = createTheme({
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={`body ${darkMode ? "dark" : "light"}`}>
          <div className="container">
            <Header
              topic={topic}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
            />
            <Routes>
              <Route path="/" element={<WelcomePage setTopic={setTopic} />} />
              <Route
                path="/quiz/:title"
                element={
                  <QuizGuard topic={topic}>
                    <QuizPage setCorrectCount={setCorrectCount} topic={topic} />
                  </QuizGuard>
                }
              />
              <Route
                path="/result"
                element={
                  <QuizGuard topic={topic}>
                    <ResultPage
                      correctCount={correctCount}
                      topic={topic}
                      setTopic={setTopic}
                    />
                  </QuizGuard>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
