import React,{useEffect,useContext,useState} from 'react'
import { useParams } from 'react-router-dom'
import LangHeader from './LangHeader'


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { AppContext } from '../../../App';
import { Theme } from '../../Theme';


import VideoCard from '../../Shared/VideoCard';



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const Languages = () => {

  
  
  const {themeToggler  } = useContext(AppContext)
  const {lang} = useParams();

  const [videos, setVideos] = useState([])

  const getVideos = async() => {
    try {
      const res = await fetch(`/getVideosByLang/${lang}`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      setVideos(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideos();
  }, [])
  

  useEffect(() => {
    var myDiv = document.getElementsByClassName('Body_container')[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
        <LangHeader />
        <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 1  }} columns={{ xs: 4, sm: 8, md: 16 }}>
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
    </>
  )
}

export default Languages