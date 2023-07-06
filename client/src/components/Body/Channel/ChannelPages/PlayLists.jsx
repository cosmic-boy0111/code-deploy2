import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'



import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import PlayListCard from './Cards/PlayListCard';
import { ChannelContext } from '../Channel';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const PlayLists = () => {


  const {user_id,channel_id} = useParams();
  const {themeToggler} = useContext(AppContext)

  const {playLists, setPlayLists} = useContext(ChannelContext)

  
  

  return (
    <>
      <h6>Created Courses</h6>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 2  }} columns={{ xs: 4, sm: 8, md: 16 }}>
            {Array.from(Array(playLists.length)).map((_, index) => (
              playLists[index].videoCount === 0 ? null :
            <Grid item xs={4} sm={4} md={4} key={index} className='video_grid'>
                {
                  <Item className='card_container' style={{
                    backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    // boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    boxShadow:'none',
                    border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    border:'none',
                    textAlign: 'left',
                    padding: '0',
                    borderRadius: '5px',
                    cursor:'pointer',
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                  }}>
                    <PlayListCard data={playLists[index]}/>
                  </Item>
                
                }
            </Grid>
            ))}
        </Grid>
        </Box>
    </>
  )
}

export default PlayLists