import React,{useState,useEffect,useContext} from 'react'
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import RecommendedCard from './Cards/RecommendedCard'


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import VideoCard from '../../Shared/VideoCard'
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
const Recommended = ({playlist_id}) => {

    const {id} = useParams();

    const {themeToggler} = useContext(AppContext)

    const [videos, setVideos] = useState([])

    const getVideos = async () =>{
        try {
            const resVid = await fetch(`/getVideoById/${id}`,{
                method : 'GET',
                headers : {
                  'Content-Type' : 'application/json'
                }
              })
              
              const dataVid = await resVid.json();

            const res = await fetch(`/videoRecommendation/${dataVid.headerTitle}`,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);
            const arr = data.filter(item => item._id !== id || item.playlist_id !== playlist_id);
            setVideos(arr);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVideos();
    }, [id])
    

  return (
      <>
      {
        window.screen.width <= '400' ? 
        
        <div className='recommended_videos'>
            <div 
            className='search_tag' style={{
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            }}
            > Recommended </div>
            <Box sx={{ flexGrow: 1 }} >
        <Grid className='mt-1' container spacing={{ xs: 2, md: 1  }} columns={{ xs: 4, sm: 8, md: 16 }}>
            {Array.from(Array(videos.length)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index} className='video_grid'>
                <Item className='card_container' style={{
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    // backgroundColor:'transparent',
                    boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    // boxShadow:'none',
                    border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    padding:'0',
                    textAlign:'initial',
                    color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
                }}>
                  <VideoCard data={videos[index]}/>
                </Item>
            </Grid>
            ))}
        </Grid>
        </Box>
        </div>
        
         : 
      
    <div className='recommended_videos' style={{
        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        textAlign:'initial',
        padding:'.5rem',
        borderRadius:'4px'
    }}>
        <div 
        // className='search_tag' style={{
        //     backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
        // }}
        > Recommended </div>
        <div className='recommended_Body'>

        {
        videos.map((e,index)=>{
            return <RecommendedCard data={e}/>
          })
        }
        </div>
      
    </div>
      }
    </>
  )
}

export default Recommended