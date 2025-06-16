import React from 'react';
import CustomSwitch from '../../Reusable/CustomSwich/CustomSwitch';
import "./Header.css";

/**
 * Header Component
 * A responsive header component that displays the app title, dark mode toggle, and topic information when available.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object|null} props.topic - The current quiz topic (null if no topic selected)
 * @param {string} props.topic.title - The title of the selected topic
 * @param {string} props.topic.iconBg - Background color for the topic icon
 * @param {boolean} props.darkMode - Current dark mode state
 * @param {Function} props.setDarkMode - Function to toggle dark mode
 * @returns {React.ReactNode} The rendered header component
 */

const Header = ({topic, darkMode, setDarkMode}) => {
  return (
    <div className='header split'>
      { topic !== null &&
      <>
      <div className="icon-container" style={{
      backgroundColor: `${topic.iconBg}`}}>
      <img src={`${process.env.PUBLIC_URL}/images/icon-accessibility.svg`} alt='topic icon'/>
      </div>    
      <h2>{ topic.title}</h2> 
      </>
      }
      <div className='header_switch split'>
        <img src={`${process.env.PUBLIC_URL}/images/${darkMode?"icon-sun-light.svg":"icon-sun-dark.svg"}`} alt='sun icon'/>
        <div className="mobile-switch">
          <CustomSwitch device="mobile" darkMode={darkMode} onChangeFn={ () => setDarkMode((prevValue)=> !prevValue)} />
        </div> 
        <div className="desktop-switch">
          <CustomSwitch device="desktop" darkMode={darkMode} onChangeFn={ () => setDarkMode((prevValue)=> !prevValue)} />
        </div>
        <img src={`${process.env.PUBLIC_URL}/images/${darkMode?"icon-moon-light.svg":"icon-moon-dark.svg"}`}  alt='moon icon'/>
      </div>
    </div>
  )
}

export default Header