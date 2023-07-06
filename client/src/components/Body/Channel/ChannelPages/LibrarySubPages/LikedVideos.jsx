import React,{useState,useEffect,useContext} from 'react'
import { Theme } from '../../../../Theme'
import { AppContext } from '../../../../../App'


import VideoCard from '../../../../Shared/VideoCard';

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LikedVideos = () => {
    const {themeToggler,rootUser} = useContext(AppContext)
    const [videos, setVideos] = useState([])

    const getLikedVideos = async() => {
        try {
            const res = await fetch(`/getLibraryLikedVideos/${rootUser.activeChannel}`,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);
            setVideos(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getLikedVideos()
    }, [])
    

  return (
    <div style={{
        display:'flex',
        flexDirection:'column',
        // backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        backgroundColor: 'transparent',
        padding:'.5rem'
    }}>
         <h6 style={{
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }} > <ThumbUpRoundedIcon /> {" "} Liked Videos</h6>
        <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 1  }} columns={{ xs: 4, sm: 8, md: 16 }}>
            {Array.from(Array(videos.length)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index} className='video_grid'>
                <Item className='card_container' style={{
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    // backgroundColor:'transparent',
                    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    boxShadow:'none',
                    // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    padding:'0',
                    textAlign:'initial',
                    color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
                }}>
                  <VideoCard data={videos[index]} extra={true}/>
                </Item>
            </Grid>
            ))}
        </Grid>
        </Box>

    </div>
  )
}

export default LikedVideos