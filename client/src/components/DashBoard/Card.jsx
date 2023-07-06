import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import { Theme } from '../Theme';
import { Tooltip } from '@mui/material';
import Line from './Line';
const Card = ({title,link,icon,data,color}) => {
 
  const {themeToggler} = useContext(AppContext)


  return <>
    <div className='card_body'>
      <div  className='pro_link_dash' style={{
          
          textTransform:'none'
        
        }}>
          <NavLink to={link} style={{
            display:'flex',
            justifyContent:'space-between',
            width:'100%',
            textDecoration:'none'
          }}>

        <span className='dash_card_icon' style={{
          backgroundColor: color,
          color : 'white'
        }}>

        {icon}
        </span>
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'flex-start',
          marginLeft:'1rem',
          justifyContent:'space-between',
          color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
        }}>
          <div  >{title}</div>
          <div style={{
            color:themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            fontSize:'20px',
            textAlign:'right'
          }} > 
          {
            data?.reduce((acc, curr) => acc + curr, 0)
          }
            {/* {data?.length}  */}
          </div>
        </div>
          </NavLink>
          <div style={{
            alignSelf:'center'
          }}>
            
          <Line data={data} color={color}/>
          </div>
      </div>
    </div>
  </>;
};

export default Card;
