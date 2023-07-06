import React, { useContext, useState, useEffect } from 'react'
import { CardMedia, IconButton, Skeleton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
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
  border: 'none',
  boxShadow: 'none',
}));
const VideoCard = ({ data }) => {
  const { themeToggler, rootUser } = useContext(AppContext)
  const { channelVideos, setChannelVideos } = useContext(VideoChannelContext)

  const navigate = useNavigate();

  const goToVideo = () => {
    navigate(`/video/${data._id}`)
  }

  const [views, setViews] = useState(0)

  const [thumbnail, setThumbnail] = useState('')


  const getThumbnail = async () => {
    try {

      console.log('under thumbnails');


      const res = await fetch(`/getThumbnailsFile/${data._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const file = await res.json();
      if (file.file === '') getThumbnail();
      setThumbnail(file.file);
    } catch (error) {

    }
  }

  useEffect(() => {
    getThumbnail();
  }, [channelVideos])


  const getViews = async () => {
    try {



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
  }, [channelVideos])



  return (

    <Grid item xs={4} sm={4} md={4} className='video_grid'>
      {
        // playLists[index].videoCount === 0 ? null : 

        <Item className='card_container' style={{
          // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
          // backgroundColor:'transparent',
          // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
          boxShadow: 'none',
          // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
          padding: '0',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'initial',
          color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
        }}>

          {/* <PlayListCard data={playLists[index]}/> */}
          {/* <img onClick={goToVideo} src={thumbnail} alt="" srcset=""  style={{
                      width:'100%',
                      height : '100%',
                      borderRadius:'7px'
                    }}/> */}

          {
            thumbnail === '' ? <Skeleton variant="rounded" height={170} /> :

              <CardMedia
                component="img"
                onClick={goToVideo}
                height="170"
                image={thumbnail}
                style={{
                  borderRadius: '5px'
                }}
                alt="green iguana"
              />

          }
          <div className='video_card_info' style={{
            padding: '.5rem 0'
          }}>
            <div className='point' onClick={goToVideo}>
              <h5 style={{
                color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
              }} >{data.headerTitle}</h5>
              <small style={{
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
              }}>{views}{" "} View |{" "}{convertDateToActualTime(data.createAt)}</small>
            </div>
            <div>

              <IconButton style={{
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
              }}>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        </Item>
      }
    </Grid>

    //       <Grid item xs={4} sm={4} md={4}  className='video_grid' style={{
    //         backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
    // backgroundColor:'transparent',
    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
    //       }}>
    //         <Item onClick={goToVideo} className='card_container' style={{
    //               // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
    //               backgroundColor:'transparent',
    //               // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
    //               boxShadow:'none',
    //               // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
    //               padding:'0',
    //               border:'none',
    //               textAlign:'initial',
    //               color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
    //           }}> 
    //           <img onClick={goToVideo} src={thumbnail} alt="" srcset=""  style={{
    //             width:'100%',
    //             height : '100%'
    //           }}/>

    //         <div className='video_card_info'>
    //           <div className='point' onClick={goToVideo}>
    //             <h5 style={{
    //               color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
    //             }} >{data.headerTitle}</h5>
    //             <small style={{
    //               color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
    //             }}>{views}{" "} View |{" "}{convertDateToActualTime(data.createAt)}</small>
    //           </div>
    //           <div>

    //           <IconButton style={{
    //               color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
    //             }}>
    //             <MoreVertIcon />
    //           </IconButton>
    //           </div>
    //         </div>
    //         </Item>
    //       </Grid>
  )
}

export default VideoCard