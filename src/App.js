import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Custom/Header/Header";
import QuizPage from "./Components/Custom/QuizPage/QuizPage";
import ResultPage from "./Components/Custom/ResultPage/ResultPage";
import WelcomePage from "./Components/Custom/WelcomPage/WelcomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
                <QuizPage setCorrectCount={setCorrectCount} topic={topic} />
              }
            />
            <Route
              path="/result"
              element={
                <ResultPage
                  correctCount={correctCount}
                  topic={topic}
                  setTopic={setTopic}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
