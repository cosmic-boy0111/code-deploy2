import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import {VideoChannelContext} from '../Videos'
import VideoCard from '../Cards/VideoCard'
import VideoCardRes from '../Cards/VideoCardRes'
import { Theme } from '../../../../Theme'
import { AppContext } from '../../../../../App'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


const VideoBody = () => {
  const {themeToggler,rootUser} = useContext(AppContext)

  const { user_id, channel_id } = useParams();

  const {channelVideos, setChannelVideos} = useContext(VideoChannelContext)


  return (
    <div className='video_body'>
       <div className='video_channel_card' style={{
      // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      // backgroundColor:'transparent',
      // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      // boxShadow:'none',
      // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
      textAlign:'initial',
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
  }}>
 
    {/* <Box sx={{ flexGrow: 1 }} > */}
    <Box sx={{ flexGrow: 1 }} >

          <Grid container spacing={{ xs: 2, md: 2  }} columns={{ xs: 4, sm: 8, md: 16 }} >

      {
        channelVideos.map((e)=>{
          return <VideoCard data={e}/>
        })
      }
      </Grid>
      </Box>
      </div>
    </div>
  )
}

export default VideoBody