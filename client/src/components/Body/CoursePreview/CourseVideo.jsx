import React, { useContext, useEffect, useState } from 'react'


import tempImage from '../../../images/assets/undraw_images_re_0kll.svg'

import { AppContext } from '../../../App';
import { Theme } from '../../Theme';


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CardMedia, IconButton } from '@mui/material';

import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { useNavigate } from 'react-router-dom';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const CourseVideo = ({id,index}) => {
    const {themeToggler} = useContext(AppContext)

    const navigate = useNavigate();

    const [video, setVideo] = useState({})
    const [thumbnail, setThumbnail] = useState('')

    const getVideo = async () => {
        try {
            
            const res = await fetch(`/getVideoById/${id}`,{
                method  : 'GET',
                headers : {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);
            setVideo(data);

            const res2 = await fetch(`/getThumbnailsFile/${data._id}`,{
                method : 'GET',
                headers : {
                  'Content-Type' : 'application/json'
                }
            })

            const file = await res2.json();
            setThumbnail(file.file);

        } catch (error) {
            
        }
    }

    useEffect(() => {

        getVideo();
      
    }, [id])

    

    const startVideo = () => {
      navigate(`/video/${id}`)
    }
    

  return (
        <Grid item xs={12} sm={12} md={4} index={id}>
              <Item style={{
                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxBackground,
                border:'none',
                boxShadow:'none',
                textAlign:'left',
                padding:'0',
                borderRadius:'10px',
                width:'100%',
                height:'250px',
                backgroundImage : `url(${thumbnail})`,
                backgroundSize : 'cover',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center',
                color:themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
              }} >
                <div style={{ 
                display:'flex',
                flexDirection:'column',
                justifyContent:'flex-end',
                height: '100%',
                }} >
                  <div style={{
                    backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    borderRadius:'9px',
                    padding:'.5rem',
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                  }} >
                    <span>

                    {index + 1}. {video.headerTitle}
                    </span>
                    <IconButton color='primary' onClick={startVideo} >
                      <PlayCircleFilledRoundedIcon />
                    </IconButton>
                  </div>
                </div>
              </Item>
            </Grid>
  )
}

export default CourseVideo
