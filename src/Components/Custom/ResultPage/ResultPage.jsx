import React from 'react'
import "./ResultPage.css";
import { useNavigate } from 'react-router-dom';


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
              <img src='/images/icon-accessibility.svg' />
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