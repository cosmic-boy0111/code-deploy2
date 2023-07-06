import React,{useContext,useState,useEffect} from 'react'
import { CardMedia, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { AppContext } from '../../../../../App'
import { VideoChannelContext } from '../Videos';
import { Theme } from '../../../../Theme'

import { useNavigate } from 'react-router-dom';

import { Player, PosterImage } from 'video-react';
import { convertDateToActualTime } from '../../../../Shared/Functions';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border : 'none',
  boxShadow : 'none',
}));
const VideoCard = ({data}) => {
  const {themeToggler,rootUser} = useContext(AppContext)

  const navigate = useNavigate();
  
  const goToVideo = () =>{
    navigate(`/video/${data._id}`)
  }

  
  const [views, setViews] = useState(0)
  const [thumbnail, setThumbnail] = useState('')
  const {channelVideos, setChannelVideos} = useContext(VideoChannelContext)

  const getViews = async() =>{
    try {
      const res = await fetch(`/getThumbnailsFile/${data._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const file = await res.json();
      setThumbnail(file.file);
      const res3 = await fetch(`/getView/${data._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const viewData = await res3.json();
      setViews(viewData.videosCount)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getViews();
  }, [channelVideos])
  
  

  return (

    <div className='video_channel_card' style={{
      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      // backgroundColor:'transparent',
      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      // boxShadow:'none',
      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
      textAlign:'initial',
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
  }}>
 
    <Box sx={{ flexGrow: 1 }} >
          {/* <Grid container spacing={1} > */}
            <Grid item  xs={12} className='point'>
              <Item onClick={goToVideo}>
                <img onClick={goToVideo} src={thumbnail} alt="" srcset=""  style={{
                  width:'100%',
                  height : '100%'
                }}/>
                {/* <CardMedia
                  component="img"
                  height={window.screen.width < '650' ? '100' : "150"}
                  image={data.thumbnail}
                  alt="green iguana"
                /> */}
                
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
              <div className='video_card_info'>
                <div className='point' onClick={goToVideo}>
                  <h5 style={{
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }} >{data.headerTitle}</h5>
                  <small style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>{views} View |{" "}{convertDateToActualTime(data.createAt)}</small>
                </div>
                <div>

                <IconButton style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>
                  <MoreVertIcon />
                </IconButton>
                </div>
              </div>
              </Item>
            </Grid>
            
          {/* </Grid> */}
        </Box>

    </div>
  )
}

export default VideoCard