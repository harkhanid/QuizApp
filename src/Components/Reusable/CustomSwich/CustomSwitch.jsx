import React from 'react'
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const CustomSwitch = ({device, onChangeFn, darkMode ,className}) => {
  const setting = {
    "mobile" : {
      "switchWidth": 32,
      "switchHeight": 20,
      "translate": "13px",
      "thumbWH": 15,
      "basePadding":2
    },
    "desktop" : {
      "switchWidth": 48,
      "switchHeight": 28,
      "translate": "20px",
      "thumbWH": 20,
      "basePadding": 4
    }
  }
  const CustomSwitchComp = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: setting[device].switchWidth,
    height: setting[device].switchHeight,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: setting[device].basePadding,
      margin: 0,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: `translateX(${setting[device].translate})`,
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#A729F5",
          opacity: 1,
          border: 0,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: setting[device].thumbWH,
      height: setting[device].thumbWH,
    },
    "& .MuiSwitch-track": {
      borderRadius: 100,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <CustomSwitchComp onChange={onChangeFn}  checked={darkMode} className={className}/>
  )
}

export default CustomSwitch