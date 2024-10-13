import React from 'react';
import CustomSwitch from '../../Reusable/CustomSwich/CustomSwitch';
import "./Header.css";


const Header = ({topic, darkMode, setDarkMode}) => {
  return (
    <div className='header split'>
      { topic !== null &&
      <>
      <div className="icon-container" style={{
      backgroundColor: `${topic.iconBg}`}}>
      <img src={'${process.env.PUBLIC_URL}/images/icon-accessibility.svg'} alt='topic icon'/>
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