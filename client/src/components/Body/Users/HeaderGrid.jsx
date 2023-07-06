import React from 'react'
import '../../../style/Body/Users.css'
import { Theme } from '../../Theme'
import { AppContext } from '../../../App'
import { useContext } from 'react'
import Grid from '@mui/material/Grid';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import { Box , Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Line from './Bar'

import { UsersContext } from './UsersPage'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HeaderGrid = () => {


  const {themeToggler} = useContext(AppContext);
  const {total} = useContext(UsersContext)

  return (
    <div className='header_grid'>
      <div className='total_user' style={{
        backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
      }}>
        <h3>Total Users</h3>
        <PeopleAltRoundedIcon style={{
          fontSize:'50px',
          color:'rgba(0, 127, 255, 0.8)'
        }} />
          <h4>{total} </h4>
      </div>
      <div className='user_join' style={{
        backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
      }}>
        <Line />
      </div>
    </div>
  )
}

export default HeaderGrid