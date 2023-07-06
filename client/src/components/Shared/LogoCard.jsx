import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import { Theme } from '../Theme';
import { useNavigate } from 'react-router-dom';

const Card = ({data}) => {

  const navigate = useNavigate();

  const {themeToggler} = useContext(AppContext)

  const go = () =>{
    navigate(data.link)
  }

  return <>
    <div className='card_body' onClick={go}>
      <div className='pro_link'>
        <img src={data.icon} alt="" srcset="" />
        <div style={{
          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
        }} >{data.title}</div>
      </div>
    </div>
  </>;
};

export default Card;
