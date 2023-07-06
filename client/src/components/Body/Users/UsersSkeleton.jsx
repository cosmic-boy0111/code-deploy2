import React,{useContext} from 'react'

import { Theme } from '../../Theme'
import { AppContext } from '../../../App'

import Skeleton from '@mui/material/Skeleton';

const UsersSkeleton = () => {
    
  const {themeToggler} = useContext(AppContext);
  return (
      <>
        <div className='header_grid'>
            <div className='total_user' style={{
                backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
            }}>
                <Skeleton animation="wave" width={100} height={40}/>
                <Skeleton animation="wave" variant="circular" width={50} height={50} />
                <Skeleton animation="wave" width={50}/>
            </div>
            <div className='user_join' style={{
                backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                // display:'flex',
                // alignItems:'center',
                // justifyContent:'center',
                padding:'1rem'
            }}>
                <Skeleton style={{
                    width:'100%',
                    height:'160px'
                }} animation="wave" variant="rectangular" />
            </div>
        </div>
        <div className='user_join' style={{
            backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
            border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            // display:'flex',
            // alignItems:'center',
            // justifyContent:'center',
            padding:'1rem',
            width:'100%'
        }}>
            <Skeleton style={{
                width:'100%',
                height:'400px'
            }} animation="wave" variant="rectangular" />
        </div>
      </>
  )
}

export default UsersSkeleton