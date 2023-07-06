import React, { useContext } from 'react'

import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';

import { Skeleton } from '@mui/material';
const ProblemSkeleton = () => {

    const {themeToggler} = useContext(AppContext);

  return (
    <div className='problem_holder' style={{
        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow
      }}
        
      > 
        <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
        }}>
            <Skeleton animation='wave' width={100} height={25}/>
            <Skeleton animation='wave' width={100} height={25}/>
            <Skeleton animation='wave' width={100} height={30}/>
        </div>
      </div>
  )
}

export default ProblemSkeleton