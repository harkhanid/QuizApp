import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import CustomProgressBar from '../../Reusable/CustomProgress/CustomProgressBar';

import "./QuizPage.css";
import data from "./data.json";

  const QuizPage = ({setCorrectCount}) => {
    const prefix = ['A', 'B', 'C', 'D'];
    const {title} = useParams();
    const navigate = useNavigate();

    const [questionCount, setQuestionCount] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [status, setStatus] = useState("Initial");

    const currentSet =  data.quizzes.filter(data=> data.title === title);
    const [question, setQuestion] = useState(null);
  
    useEffect(()=>{
      if(currentSet.length >0){
        setQuestion(currentSet[0].questions[questionCount]);
      }
    },[currentSet, questionCount]);

  const resetFunction = ()=>{
    setStatus("initial");
    setSelectedAnswer("");
  }

  const handleOptionAction = (e) =>{
    if(status !== "submitted"){
      if(status === "invalidAnswer"){
        setStatus("initial");
      }
      setSelectedAnswer(e);
    }

  }

  const handleSubmit = (e) =>{
    if(selectedAnswer === ""){
      setStatus("invalidAnswer")
    }else{
      setStatus("submitted");
      if(selectedAnswer === question.answer){
        setCorrectCount((prev)=> prev + 1);
      }
      setTimeout(()=>{
        resetFunction();
        if(questionCount ===  currentSet[0].questions.length - 1){
          navigate("/result");
        }else{
          setQuestionCount((prev)=> prev+1);
        }
      },2000)
    }
  }

  return (
    <div className='quiz_section child-margin-top rotate-split'>
    <div className="question_card flow-content">      
      <p className='small-text'>Question {questionCount + 1} of the 10</p>
      <p className='question'>{question?.question}</p>
      <CustomProgressBar prog={questionCount * 10} />
    </div>
    <div className={`answer_card flow-content ${status === "submitted" ? "submitted":"not-submitted"}`}> 
      {
        question?.options.map((opt, i) =>{
          return <button 
                    key={i} 
                    value={opt} 
                    correct={opt === question?.answer? "true": "false"}
                    className={`option-btn ${opt === selectedAnswer? "selected": ""} correct`} 
                    onClick={()=> handleOptionAction(opt)} >
                    <div className='option-icon icon-container'>
                      <p>{prefix[i]}</p>
                    </div>
                    <p>{opt}</p>
                      { (status === "submitted" && opt === question.answer) &&
                        (<img src='${process.env.PUBLIC_URL}/images/icon-correct.svg' alt='correct answer icon'/>) 
                      }
                      { (status === "submitted" && opt === selectedAnswer && opt !== question.answer) &&
                            (<img src='${process.env.PUBLIC_URL}/images/icon-error.svg' alt='wrong answer icon'/>)
                    }
                    </button>
            
        })
      }     
      <button disabled={status === "submitted" } className='main-btn' onClick={(e)=>handleSubmit(e)}><p className='center-text' >Submit Answer</p></button>
      { status === "invalidAnswer" 
      &&
      <div className='error-message split'>
        <img src='${process.env.PUBLIC_URL}/images/icon-error.svg' alt='error icon'/>
        <p>Please select an answer</p>
      </div>
      }
    </div>
    
    </div>
  )
}

export default QuizPage