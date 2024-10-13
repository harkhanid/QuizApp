import React from 'react'
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const CustomSwitch = ({width, height, onChangeFn, darkMode}) => {
  const staticStats = {
    basePadding: 2,
  }
  const CustomSwitchComp = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: width,
    height: height,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: staticStats.basePadding,
      margin: 0,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(14px)",
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
      width: 15,
      height: 15,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <CustomSwitchComp onChange={onChangeFn}  checked={darkMode}/>
  )
}

export default CustomSwitch