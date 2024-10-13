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
      <img src='/images/icon-accessibility.svg' />
      </div>    
      <h2>{ topic.title}</h2> 
      </>
      }
      <div className='header_switch split'>
        <img src={`/images/${darkMode?"icon-sun-light.svg":"icon-sun-dark.svg"}`}/>
        {/* <CustomSwitch width={32} height={20}  className="mobile" darkMode={darkMode} onChangeFn={ () => setDarkMode((prevValue)=> !prevValue)} /> */}
        <CustomSwitch width={32} height={20}  className="desktop" darkMode={darkMode} onChangeFn={ () => setDarkMode((prevValue)=> !prevValue)} />
        <img src={`/images/${darkMode?"icon-moon-light.svg":"icon-moon-dark.svg"}`} />
      </div>
    </div>
  )
}

export default Header