import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import { CardMedia, IconButton, Skeleton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../Shared/Functions';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border: 'none',
  boxShadow: 'none',
}));
const VideoCard = ({ data }) => {

  const { themeToggler } = useContext(AppContext)

  const navigate = useNavigate();

  const goToVideo = () => {
    navigate(`/video/${data._id}`)
  }

  const [channel, setChannel] = useState({})


  const [views, setViews] = useState(0)

  const [thumbnail, setThumbnail] = useState('')

  const [isProgress, setIsProgress] = useState(true)

  const getViews = async () => {
    try {
      setIsProgress(true);
      const res2 = await fetch(`/getThumbnailsFile/${data._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const file = await res2.json();
      setThumbnail(file.file);

      setIsProgress(false);

      const res3 = await fetch(`/getView/${data._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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
  }, [])


  const getChannel = async () => {
    try {
      const res = await fetch(`/getChannel/${data.channel_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const Data = await res.json();
      setChannel(Data)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChannel();
  }, [])



  return (
    <div className='playlist_card_container' style={{
      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
      padding:'.5rem',
      borderRadius:'5px',
      marginBottom:'.5rem'
    }} >
      {/* <Box sx={{ flexGrow: 1 }} > */}
      <Grid container wrap={'nowrap'} spacing={1} >
        <Grid item xs={5} className='point'>
          <Item style={{ padding:'0' }} >
            {
              isProgress ? <Skeleton variant="rounded" width={'70%'} height={'100%'} /> :
            <img onClick={goToVideo} src={thumbnail} alt="" srcset="" style={{
              width: '70%',
              height: '100%',
              borderRadius: '5px'
            }} />
          }
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item style={{ padding : '0' }} >
            <div className='video_card_info'>
              <div className='point' onClick={goToVideo} style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontSize: '12px'
              }}>
                <div style={{
                  color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  fontSize: '13px'
                }} >{data.headerTitle.length > 20 ? data.headerTitle.slice(0, 20) + '...' : data.headerTitle}</div>
                <span style={{
                  color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }} >{channel.name}</span>
                <span style={{
                  color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>{views}{" "} views  | {" "}{formatDate(data.createAt)}</span>
              </div>
              <div>
              </div>
            </div>
          </Item>
        </Grid>

      </Grid>
      {/* </Box> */}

    </div>
  )
}

export default VideoCard