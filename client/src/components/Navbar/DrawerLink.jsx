import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../App'
import { Theme } from '../Theme'

const DrawerLink = ({logo,link,name}) => {

    const {themeToggler} = useContext(AppContext);

  return (
    <NavLink className='link2' to={link} style={{
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
      }} > <img src={logo} alt="" className='link_icon'/> {name} </NavLink>
  )
}

export default DrawerLink