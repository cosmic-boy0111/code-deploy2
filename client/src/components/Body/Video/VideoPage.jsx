import React, { useState, useEffect, useContext, createContext } from 'react'
import VideoPlayer from './VideoPlayer'
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';


import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useParams } from 'react-router-dom';

import '../../../style/Body/Video.css'
import VideoInfoAction from './VideoInfoAction';
import ChannelInfo from './ChannelInfo';
import PlayList from './PlayList';
import Recommended from './Recommended';
import Comments from './Comments';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export const VideoPageContext = createContext();

const VideoPage = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { themeToggler, rootUser } = useContext(AppContext)
  const { id } = useParams();


  const [video, setVideo] = useState({})
  const [videoUrl, setVideoUrl] = useState('')
  const [playListData, setPlayListData] = useState([])

  const [channelInfo, setChannelInfo] = useState({})
  const [views, setViews] = useState(0)

  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)


  const getVideo = async () => {
    try {

      const rootRes = await fetch('/about', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const DataRes = await rootRes.json();

      const resLike = await fetch(`/getVideoLikeList/${DataRes.activeChannel}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const dataLike = await resLike.json();
      if (dataLike.videos.find(element => element === id) === undefined) {
        setLike(false)
      } else {
        setLike(true)
      }


      const res = await fetch(`/getVideoById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setVideo(data)


      const res21 = await fetch(`/getChannel/${data.channel_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res2 = await fetch(`/getChannelImg/${data.channel_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const Data = await res21.json();
      const Data2 = await res2.json();
      console.log(Data2);
      setChannelInfo({
        name: Data.name,
        subCounts: Data.subCounts,
        img: Data2.img
      })


      const videoUrlRes = await fetch(`/getVideoFile/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const videoUrlData = await videoUrlRes.json();
      console.log(videoUrlData);
      setVideoUrl(videoUrlData.file)

      console.log(data.playlist_id);


      const viewRes = await fetch(`/addView/${id}/${rootUser._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const hisRes = await fetch(`/addHistoryVideo/${rootUser.activeChannel}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })





      const res3 = await fetch(`/getView/${data._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const viewData = await res3.json();
      setViews(viewData.videosCount)


      const playlistRes = await fetch(`/addLibraryPlaylist/${DataRes.activeChannel}/${data.playlist_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })


      const userCourseLibrary = await fetch('/add_course_in_library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          courseId: data.playlist_id
        })
      })

      console.log(userCourseLibrary);




    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideo();
  }, [id])

  useEffect(() => {
    getVideo();
  }, [])


  return (
    <div className='body_margin'>

      <VideoPageContext.Provider value={{
        channelInfo
      }}>
        {
          window.screen.width <= '450' ? <Item className='extra_res_video_container'
            style={{
              backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
              boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
              border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,

              color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
              textAlign: 'initial'
            }}
          >
            <VideoPlayer url={videoUrl} video={video} />
          </Item>
            : null
        }

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} columns={{ xs: 4, sm: 4, md: 12 }}>
            <Grid item xs={8} >
              <Item className='card_container'
                style={{
                  backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                  boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                  border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,

                  color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  textAlign: 'initial'
                }}
              >
                {
                  window.screen.width <= '450' ? null :
                    <VideoPlayer url={videoUrl} video={video} />
                }
                <VideoInfoAction data={video} views={views} like={like} setLike={setLike} dislike={dislike} setDislike={setDislike} />
                <Divider className='my-3' />
                <ChannelInfo user_id={video.userId} description={video.description} />
              </Item>
              <Item className='card_container'
                style={{
                  backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                  boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                  border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,

                  color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  textAlign: 'initial',
                  marginTop:'1rem'
                }}
              >
                <Comments />
              </Item>
            </Grid>
            <Grid item xs={4} >
              <Item className='card_container'
                style={{
                  // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                  // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                  // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  textAlign: 'initial',
                }}
              >
                {
                  video.playlist_id === undefined || video.playlist_id === '' ? null :
                    <PlayList playlist_id={video.playlist_id} />
                }
                {
                  video.langType === undefined ? null :
                    <Recommended playlist_id={video.playlist_id} />
                }
              </Item>
            </Grid>
          </Grid>
        </Box>
      </VideoPageContext.Provider>
    </div>
  )
}

export default VideoPage