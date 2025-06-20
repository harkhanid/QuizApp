import React from 'react'
import { useNavigate } from 'react-router-dom';
import  MenuItems from "../../MenuItems.json";
import "./WelcomePage.css";

/**
 * WelcomePage Component
 * The landing page of the quiz application that displays available quiz topics.
 * Users can select a topic to start a quiz.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.setTopic - Function to set the selected quiz topic
 * @returns {React.ReactNode} The rendered welcome page
 */
const WelcomePage = ({setTopic}) => {
  const navigate = useNavigate();

  const handleClick = (topic) =>{
    setTopic(topic);
    navigate('/quiz/'+topic.title);
  }

  return (
    <div className="welcome_page child-margin-top rotate-split">
      <div className='text-container'>
        <p className='big-text light'>Welcome to the </p>
        <p className='big-text'>Frontend Quiz!</p>
        <p className='small-text text-hint'>Pick a subject to get started</p>
      </div>
      <div className='options flow-content'>
        {
          MenuItems.map(item =>{
            return (
              <button key={item.title} onClick={()=>{handleClick(item)}} className='option-btn' value={item.title}><div className="icon-container" style={{backgroundColor:item.iconBg}}><img src={`${process.env.PUBLIC_URL}/images/${item.img}`} alt='html icon' /></div> <p>{item.title}</p></button>
            )
          })
        }
      </div>
    </div>
  )
}

export default WelcomePage