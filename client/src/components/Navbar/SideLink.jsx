import React,{useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@mui/material'

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ListItemButton from '@mui/material/ListItemButton';

import { useNavigate } from 'react-router-dom';

import { Theme } from '../Theme';
import { AppContext } from '../../App';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';


const SideLink = ({icon,link,name,open}) => {
    

  const {themeToggler} = useContext(AppContext)
    const navigate = useNavigate();
    
    
    return (

        <ListItemButton className='first_div_hover'  style={{
          
          margin:'0',
          
          // padding:'.5rem'
          // backgroundColor:'transparent'
          
        }}>
          <NavLink 
          style={({ isActive }) => ({
            padding:'.5rem',
            fontSize:'14px',
            display:'flex',
            backgroundColor: isActive ? themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor : '',
            width: open ? '100%' : 'auto',
            borderRadius: isActive ? '5px' : '',
            color: isActive ? '#1976d2' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            boxShadow: isActive ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : ''
          })}
          
          to={link} className='back_drop' 
          // style={{
          //         padding:'.5rem',
          //         // paddingLeft:'.2rem',
          //         fontSize:'14px',
          //         display:'flex',
          //         width: open ? '100%' : 'auto',
          //         borderRadius: index == selected ? '5px' : '',
          //         color: index == selected ? '#1976d2' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
          //         boxShadow: index == selected ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : ''
          //         // color : index == click ? 'red' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  
          //       }}
                
                >
              {
                open ? icon : <Tooltip title={name} placement="right">
                {icon}
              </Tooltip>
              }
              <span style={{
                  marginLeft:'1rem',
                  // color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  fontSize:'16px',
                  display : open ? 'block' : 'none'
                }}>
                  {name}
                </span> 
            </NavLink>
          
            {/* <span
                // sx={{
                //   minWidth: 0,
                //   // mr: open ? 1 : 'auto',
                 
                // }}
                className='back_drop'
                style={{
                  color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  padding:'.5rem',
                  // paddingLeft:'.2rem',
                  fontSize:'14px',
                  width:'100%'
                  
                  // color : index == click ? 'red' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  
                }}
              >
                
                 {
                    open ? icon  :

                <Tooltip title={name} placement="right">
                  {icon}
                </Tooltip>
                }
                 <span style={{
                  marginLeft:'1rem',
                  color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  fontSize:'16px',
                  visibility : open ? 'visible' : 'hidden'
                }}>
                  {name}
                </span> 
              </span>

                */}

              {/* <ListItemText  primary={name} sx={{  }}/> */}
        
        </ListItemButton>

    )
}

export default SideLink
