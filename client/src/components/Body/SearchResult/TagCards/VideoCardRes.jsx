import React,{useContext,useEffect,useState} from 'react'
import { CardMedia, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';

import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import { useNavigate, useParams } from 'react-router-dom';
import { convertDateToActualTime } from '../../../Shared/Functions';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border : 'none',
  boxShadow : 'none',
}));
const VideoCardRes = ({Data}) => {
  const {themeToggler,rootUser} = useContext(AppContext)
  const {tag } = useParams();
  const navigate = useNavigate();


  const [data, setData] = React.useState({})

  const [channelInfo, setChannelInfo] = useState({})

  const getData = async() =>{
    try {
        const res21 = await fetch(`/getVideoById/${Data.id}`,{
            method : 'GET',
            headers : {
              'Content-Type' : 'application/json'
            }
          })
          
          const dataRes = await res21.json();
          setData(dataRes)

          const res = await fetch(`/getChannel/${dataRes.channel_id}`,{
            method:'GET',
            headers : {
              'Content-Type' : 'application/json'
            }
          })
  
          const Data1 = await res.json();
          
  
          const res2 = await fetch(`/getChannelImg/${dataRes.channel_id}`,{
            method:'GET',
            headers : {
              'Content-Type' : 'application/json'
            }
          })
  
          const Data2 = await res2.json();
          setChannelInfo({
            name : Data1.name,
            img : Data2.img
          })
  

    } catch (error) {
        console.log(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, [tag])
  
  
  const goToVideo = () =>{
    navigate(`/video/${data._id}`)
  }
  

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
            <Grid item  xs={ 12} className='point'>
              <Item onClick={goToVideo}>
                <img onClick={goToVideo} src={data.thumbnail} alt="" srcset=""  style={{
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
                <div className='point' >
                  <h5 style={{
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }} onClick={goToVideo}>{data.headerTitle}</h5>
                  <small style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>1 View |{" "}{convertDateToActualTime(data.createAt)}</small>
                  <div style={{
                    display:'flex',
                    alignItems:'center'
                  }}>
                  <Avatar
                aria-label="recipe"
                
              >
                {channelInfo.img === "" ? null : (
                  <img
                    src={channelInfo.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                
              </Avatar>
              <div className='under_channel_card_info' >
                  <div style={{
                      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }}>{channelInfo.name} </div>
                  
              </div>
                  </div>
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

export default VideoCardRes