import React from 'react'
import "./ResultPage.css";
import { useNavigate } from 'react-router-dom';

/**
 * ResultPage Component
 * Displays the quiz results including score, correct answers, and performance metrics.
 * Provides options to play again or return to the welcome page.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.score - The user's quiz score
 * @param {number} props.totalQuestions - Total number of questions in the quiz
 * @param {Function} props.resetQuiz - Function to reset the quiz state
 * @returns {React.ReactNode} The rendered result page
 */

const ResultPage = ({correctCount, topic, setTopic}) => {
  const navigate = useNavigate();

  const handlePlayAgainClick = () =>{
    setTopic(null);
    navigate("/");
  }

  return (
    <div className='child-margin-top rotate-split'>
      <div className="result-content">
        <p className='big-text light'>Quiz completed </p>
        <p className='big-text '>You scored...</p>
      </div>
      <div className='flow-content'>
      <div className="result-card ">
        <div className=''>
          <div className='split card-title' >
            <div className="icon-container" style={{
              backgroundColor: `${topic?.iconBg}`}}>
              <img src={`${process.env.PUBLIC_URL}/images/icon-accessibility.svg`} alt='topic icon'/>
            </div>
            <p>{topic?.title}</p>
          </div>
          <p className='result-text'>{correctCount}</p>
          <p className='after-text'>out of 10</p>
        </div>
      </div>
      <button className='main-btn'><p className="center-text" onClick={handlePlayAgainClick}>Play again</p></button>
      </div>
    </div>
  )
}

export default ResultPage