import React,{useContext,createContext,useState} from 'react';
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import About from './About';

import GraphicalRepresentation from './InfoPages/GraphicalRepresentation';
import UserPosts from './InfoPages/UserPosts';
import { ProfileContext } from './Profile';
import UserProblems from './InfoPages/UserProblems';
import Followers from './InfoPages/Followers';


import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box , Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Courses from './InfoPages/Courses';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProfileHolder = () => {
    const { themeToggler } = useContext(AppContext)

    const {Switch} = useContext(ProfileContext)

    const getInfo = (tag) =>{
      if(tag === 'Profile'){
        return <>
        <About />
        <GraphicalRepresentation />
        </> 
      }else if(tag === 'Posts'){
        return <UserPosts />
      }else if(tag === 'Problems'){
        return <UserProblems />
      }else if(tag === 'Courses'){
        return <Courses />
      }
      else {
        return <Followers />
      }
    }


  return <>
    
      <div className='info_holder'>
          {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} columns={{ xs: 4, sm: 4, md: 12 }}> */}
            {/* <Grid item xs={5} style={{
              display :  window.screen.width < '900' && Switch !== 'Profile' ? 'none' : 'block'
              // display :    Switch !== 'Profile' ? 'none' : 'block'
            }}>
              <Item className='card_container'
              style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                  }}
              >
                <About />
              </Item>
            </Grid> */}
            {/* <Grid item xs={ 12 } > */}

                  {getInfo(Switch)}
              
            {/* </Grid>
          </Grid>
        </Box> */}
      </div>
  </>;
};

export default ProfileHolder;
