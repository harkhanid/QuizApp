import "./App.css";
import { useState } from "react";
import Header from "./Components/Custom/Header/Header";
import QuizPage from "./Components/Custom/QuizPage/QuizPage";
import ResultPage from "./Components/Custom/ResultPage/ResultPage";
import WelcomePage from "./Components/Custom/WelcomPage/WelcomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const QuizGuard = ({ topic, children }) => {
  if (!topic) {
    // Redirect to home if topic is not set
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [topic, setTopic] = useState(null);

  return (
    <Router>
      <div className={`body ${darkMode ? "dark" : "light"}`}>
        <div className="container">
          <Header topic={topic} setDarkMode={setDarkMode} darkMode={darkMode} />
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
  );
}

export default App;
