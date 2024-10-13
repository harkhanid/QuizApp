import React from 'react'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';




const CustomProgressBar = props => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#FFF",
    },
    [`& .${linearProgressClasses.bar}`]: {
      height: 8,
      marginTop: 4,
      marginLeft: 4,
      width: `${Math.max(props.prog - 4, 0)}%`,
      borderRadius: 10,
      backgroundColor: '#A729F5',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));
  return (
    <BorderLinearProgress variant="determinate" value={100} className="progress_bar" />
  )
}

// CustomProgressBar.propTypes = {}

export default CustomProgressBar