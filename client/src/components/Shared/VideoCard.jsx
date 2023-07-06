import React,{useContext,useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../../style/shared/video.css'

import { AppContext } from '../../App';
import { Theme } from '../Theme';

import Avatar from '@mui/material/Avatar';

import { useNavigate } from 'react-router-dom';

import { convertDateToActualTime } from './Functions';
export default function ActionAreaCard({data,extra=false}) {

    const navigate = useNavigate();
    const {themeToggler} =  useContext(AppContext)

    const [channelInfo, setChannelInfo] = useState({})

    
    const [views, setViews] = useState(0)

    const [thumbnail, setThumbnail] = useState('')

    const getData = async() =>{
      try {
        const res = await fetch(`/getChannel/${data.channel_id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        const res2 = await fetch(`/getChannelImg/${data.channel_id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const Data = await res.json();
        const Data2 = await res2.json();
        console.log(Data2);
        setChannelInfo({
          name : Data.name,
          img : Data2.img
        })

        const res3 = await fetch(`/getView/${data._id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const viewData = await res3.json();
        setViews(viewData.videosCount)

        const res4 = await fetch(`/getThumbnailsFile/${data._id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
  
        const file = await res4.json();
        setThumbnail(file.file);

      } catch (error) {
        
      }
    }

    useEffect(() => {
      getData()
    }, [])


    const go = () =>{
      navigate(`/channel/${data.userId}/${data.channel_id}`)
    }

    const goToVideo = () =>{
      navigate(`/video/${data._id}`)
    }
    


  return (
    // <Card sx={{ maxWidth: 345 }} >
    <>
      <CardActionArea onClick={goToVideo}>
        <CardMedia
          component="img"
          height="160"
          image={thumbnail}
          alt="green iguana"
        />
        
      </CardActionArea>
      <CardContent className='point'> 
          <Typography gutterBottom variant="div" component="div" className="card_Avatar" >
            <span onClick={go}>

            <Avatar src={channelInfo.img} className='point' /> 
            </span>
            <span className='channel_info'  onClick={goToVideo} > {data.headerTitle} </span> 
          </Typography>
          <Typography variant="body2"  style={{
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
          }}>
            <span className='point' onClick={go} >{channelInfo.name}</span>
            <div>{views}{" "} Views |{" "}{convertDateToActualTime(data.createAt)} 
            </div>
          </Typography>
          
        </CardContent>
        </>
    // </Card>
  );
}
