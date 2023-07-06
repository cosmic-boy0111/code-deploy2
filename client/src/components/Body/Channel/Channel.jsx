import React,{useEffect,createContext,useState, useContext} from 'react'
import createChannel from '../../../images/assets/undraw_building_blocks_re_5ahy.svg'
import '../../../style/Channel/Channel.css'
import Button from '@mui/material/Button';
import CreateChannel from './CreateChannel'
import ChannelHeader from './ChannelHeader';
import ChannelBody from './ChannelBody';
import { useParams, useNavigate } from 'react-router-dom'


export const ChannelContext = createContext()
const Channel = () => {

    

     
    useEffect(() => {
        var myDiv = document.getElementsByTagName("body")[0];
        myDiv.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);

   const [page, setPage] = useState('Videos')


   const {channel_id, user_id} = useParams();


   const [channel, setChannel] = React.useState({});

   const [channelImg, setChannelImg] = useState({})

   const [channelList, setChannelList] = useState([])

   const [channelVideos, setChannelVideos] = useState([])


   const [playLists, setPlayLists] = useState([])

  
  const getPlayLists = async() =>{
    try {
      const res = await fetch(`/getPlayLists/${channel_id}`,{
        method : 'GET',
        headers : {
          'Content-Type'  : 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setPlayLists(data)

    } catch (error) {
      
    }
  }

  useEffect(() => {

    getPlayLists()
  
  }, [])



  const getChannel = async() =>{
    try {
      const res = await fetch(`/getChannel/${channel_id}`,{
        method:'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const Data = await res.json();
      setChannel(Data)

      const res2 = await fetch(`/getChannelImg/${channel_id}`,{
        method:'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const Data2 = await res2.json();
      setChannelImg(Data2)

      const channel_res = await fetch(`/channelLists/${user_id}`,{
        method:'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const channel_data = await channel_res.json();
      const filter_Data = channel_data.filter((e)=>{
        return e._id !== channel_id;
      })
      setChannelList(filter_Data);


    } catch (error) {
      
    }
  }


  const getVideos = async() =>{
    try {
      const res = await fetch(`/getVideosByChannel/${channel_id}`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();

      console.log(data);
      setChannelVideos(data);

    } catch (error) {
      console.log(error);
    }
  }


  
  
  React.useEffect(() => {
    
    getVideos();
    getChannel();
    
  }, [channel_id])
  

  return (
    <div className='body_margin'>

    <ChannelContext.Provider value={{
      page,
      setPage,
      channel,
      setChannel,
      channelImg,
      setChannelImg,
      channelList,
      setChannelList,
      channelVideos,
      setChannelVideos,
      playLists, 
      setPlayLists
    }}>
      <ChannelHeader />
      <ChannelBody />
    </ChannelContext.Provider>
      </div>
  )
}

export default Channel