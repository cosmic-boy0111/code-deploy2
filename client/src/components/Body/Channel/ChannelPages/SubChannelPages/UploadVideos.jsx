import React,{useContext,useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

import icon from '../../../../../images/assets/undraw_online_media_re_r9qv.svg'


import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';
import { padding } from '@mui/system';
import { appendOwnerState, Avatar } from '@mui/material'

import { IconButton } from '@mui/material';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify'


import load from '../../../../Shared/LinearProgress'

import {VideoChannelContext} from '../Videos'
import FileSelector from './FileSelector';
import VideoUploadForm from './VideoUploadForm';

import axios from 'axios'

import LinearProgress from '../../../../Shared/LinearProgress'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
const Input = styled("input")({
  display: "none",
});
  
export default function ResponsiveDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {themeToggler} = useContext(AppContext)

  const {user_id,channel_id} = useParams();
  const [loader, setLoader] = useState(false)

  const {openVideoDialog,setOpenVideoDialog,channelVideos,setChannelVideos,getVideos} = useContext(VideoChannelContext)

  useEffect(() => {
    var myDiv = document.getElementsByTagName("body")[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
}, []);

  const handleClose = () => {
    setOpenVideoDialog(false);
    setVideo({
      channel_id : channel_id,
      playlist_id : '',
      userId : user_id,
      file : '',
      thumbnail : '',
      headerTitle: '',
      description : '',
      // field : '',
      langType : '',
    })
  };

  const [tit, setTit] = useState(false);
  const [thumb, setThumb] = useState(false);

  const [video, setVideo] = useState({
    channel_id : channel_id,
    playlist_id : '',
    userId : user_id,
    file : '',
    thumbnail : '',
    headerTitle: '',
    description : '',
    // field : '',
    langType : '',
  })


  function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }


  const uploadVideo = async() =>{
    if(video.headerTitle === ''){
      setTit(true);
      return;
    }

    if(video.thumbnail === ''){
      setThumb(true);
      return;
    }

    try {
      setLoader(true)
      const res = await fetch('/createVideo', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          channel_id : video.channel_id,
          playlist_id : video.playlist_id,
          userId : video.userId,
          // file : video.file,
          // thumbnail : video.thumbnail,
          headerTitle: video.headerTitle,
          description : video.description,
          langType : video.langType,
        })
      })

      
      const data = await res.json();
      console.log(data);

      var file = dataURLtoFile(video.file,'video.mp4')
      
      var formData = new FormData()
      formData.append('file', file)
      axios.post(`/addVideoFile/${data._id}`, formData, {
      }).then(res => {
        
      })

      
      var thumbnail = dataURLtoFile(video.thumbnail,'thumbnail.png')

      formData = new FormData()
      formData.append('file', thumbnail)
      axios.post(`/addThumbnailsFile/${data._id}`, formData, {
      }).then(res => {

      })

      console.log('after thumbnail file');
      toast.success('video uploaded')
      // getVideos();
      
      setChannelVideos([...channelVideos,data])
      
      setVideo({
        channel_id : channel_id,
        playlist_id : '',
        userId : user_id,
        file : '',
        thumbnail : '',
        headerTitle: '',
        description : '',
        langType : '',
      })
      
      setLoader(false)
      setOpenVideoDialog(false)
    } catch (error) {
      setLoader(false)
      toast.error('video not uploaded')
    }

  }


  return (
    <div>
      
      <Dialog
        fullScreen={fullScreen}
        open={openVideoDialog}
        // maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        
      >
        <DialogTitle id="responsive-dialog-title" style={{
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            padding:'.5rem 1rem',
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            position:'sticky',
            top:'0',
            width:'100%',
            zIndex:'10'
        }}>
          {
            loader ?  <LinearProgress /> : null
          }
          {"Upload videos"}
        </DialogTitle>
        <div className='create_channel_dialog' style={{
            // backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            // backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            // padding:'.5rem 0rem',
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color

        }}> 
            {
              video.file === '' ? <FileSelector video={video} setVideo={setVideo}/> : <VideoUploadForm  video={video} setVideo={setVideo} tit={tit} setTit={setTit} thumb={thumb} setThumb={setThumb} />
            }
            
            <DialogActions className='create_dialog_action_button' style={{
              backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            }}>
              
              <Button onClick={handleClose} autoFocus variant='contained'>
                Back
              </Button>
              {
                video.file === '' ? null : 
                <Button  autoFocus variant='contained' onClick={uploadVideo}>
                  Upload
                </Button>
              }
            </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
