import React,{useEffect,useState,useContext} from 'react'
import { Theme } from '../../../../Theme'
import { AppContext } from '../../../../../App'



import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';

import PlayListCard from '../Cards/PlayListCard';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const PlayList = () => {
    const {themeToggler,rootUser} = useContext(AppContext)
  
    const [playLists, setPlayLists] = useState([])


    const [showAll, setShowAll] = useState(true);
    const [courseCount, setCourseCount] = useState(4);

    const getPlayList = async() =>{
        try {
            const res = await fetch(`/getLibraryPlaylist/${rootUser.activeChannel}`,{
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
            })

            const data = await res.json();
            console.log(data);
            setPlayLists(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      getPlayList()
    }, [])

    
    const viewAll = () => {
      setShowAll(false);
      setCourseCount(playLists.length);
  }

  const viewLess = () => {
      setShowAll(true);
      setCourseCount(4);
  }
  


    
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
        }} > <PlaylistPlayRoundedIcon /> {" "} Courses</h6>
        <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 1  }} columns={{ xs: 4, sm: 8, md: 16 }}>
            {Array.from(Array(playLists.length)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index} className='video_grid'>
                {
                  playLists[index].videoCount === 0 ? null : 
                
                <Item className='card_container' style={{
                    // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    backgroundColor:'transparent',
                    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    boxShadow:'none',
                    // border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    padding:'0',
                    border:'none',
                    textAlign:'initial',
                    color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
                }}>
                
                  <PlayListCard data={playLists[index]}/>
                </Item>
                }
            </Grid>
            ))}
        </Grid>
        </Box>
    </div>
  )
}

export default PlayList