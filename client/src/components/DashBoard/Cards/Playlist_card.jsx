import React, { useContext } from 'react'


import { CardMedia, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../Shared/Functions';
import { Theme } from '../../Theme';
import { AppContext } from '../../../App';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border: 'none',
  boxShadow: 'none',
}));

const Playlist_card = ({data}) => {



  const {themeToggler} = useContext(AppContext)

  const navigate = useNavigate();

  const goToVideo = () => {
    navigate(`/course/${data._id}`)
  }

  return (
    <div className='playlist_card_container' style={{
      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
      padding:'.5rem',
      borderRadius:'5px',
      marginBottom:'.5rem'
    }} 
      onClick={goToVideo}
    >
      {/* <Box sx={{ flexGrow: 1 }} > */}
      <Grid container wrap={'nowrap'}>
        <Grid item xs={5} className='point'>
          <Item style={{ padding:'0' }} >
            <img 
            // onClick={goToVideo} 
            src={data.playListImg} alt="" srcset="" style={{
              width: '70%',
              height: '100%',
              borderRadius: '5px'
            }} />
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item style={{ padding : '0' }} >
            <div className='video_card_info'>
              <div className='point' 
              // onClick={goToVideo} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontSize: '12px'
              }}>
                <div style={{
                  color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                  fontSize: '13px'
                }} >{data.name.length > 20 ? data.name.slice(0, 20) + '...' : data.name}</div>
                {/* <span style={{
                  color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }} >{channel.name}</span> */}
                <span style={{
                  color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>{data.videoCount}{" "} Lesson  | {" "}{formatDate(data.createdAt)}</span>
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

export default Playlist_card