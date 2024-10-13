import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  paddingLeft: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    height: 4,
    marginTop: 2,
    marginLeft: 20,
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

const CustomProgressBar = props => {
  return (
    <BorderLinearProgress variant="determinate" value={props.prog} className="progress_bar" />
  )
}

// CustomProgressBar.propTypes = {}

export default CustomProgressBar