import React,{useContext,useState,useEffect} from 'react'

import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';

import { Skeleton } from '@mui/material';
const Card = () => {
    const { themeToggler } = useContext(AppContext)

    

  return (
    <div style={{
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        display : 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        
    }}>
        <div style={{
          display:'flex',
          alignItems:'center'
        }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
          <div style={{marginLeft:'.5rem',display:'flex',flexDirection:'column'}} >
              <Skeleton animation="wave" width={80} />
              <Skeleton animation="wave" width={100} />
          </div>
        </div>

        <Skeleton animation="wave" width={90} height={40} />
        
    </div>
  )
}

export default Card