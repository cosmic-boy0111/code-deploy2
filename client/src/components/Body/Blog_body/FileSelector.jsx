import React,{useState,useEffect,useContext} from 'react'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import { Button, Tooltip } from '@mui/material';
import { styled } from "@mui/material/styles";
import CardMedia from '@mui/material/CardMedia';
import { BlogContext } from './Blog';
import { AppContext } from '../../../App'

import VideoSnapshot from 'video-snapshot';


import { checkFile } from '../../Shared/Functions';
import axios from 'axios';

const Input = styled("input")({
  display: "none",
});

const FileSelector = () => {

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const { blogData, setBlogData } = useContext(AppContext)
  const [file, setFile] = useState('')
  // const [playFile, setPlayFile] = useState('')

  // const [file, setFile] = useState(null)

  
  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }


  const handleChange = async(e) =>{
    // setBlogData({...blogData , file : await toBase64(e.target.files[0])});
    console.log({...blogData , file : e.target.files[0]});

    setBlogData({...blogData , file : e.target.files[0]});
    setFile(await toBase64(e.target.files[0]));
    console.log(e.target.files[0]);
    
    // var file = ''
    // if(e.target.files[0].type.split('/')[0] === 'image'){
    //   console.log('image');
    //   file = e.target.files[0]
    // }else{
    //   const snapshoter = new VideoSnapshot(e.target.files[0]);
    //   const previewSrc = await snapshoter.takeSnapshot();
    //   file = dataURLtoFile(previewSrc, 'sample.png');

    // }

    // const formData = new FormData()
    //   formData.append('file', file)
    //   await axios.post(`/generate_caption`, formData, {
    //   }).then(res => {
    //     console.log(res);
    //     setBlogData({...blogData,description : res.data.result})
    //     console.log({
    //       ...blogData,
    //       file : e.target.files[0],
    //       description : res.data.result
    //     });
    //     // setChannelImg({ ...channelImg, img: res.data.img })
    //     // setVideo({ ...video, description : res.data.result } );
    //   })
    
    e.target.value = ""

  }

  
  const getFile = async() =>{
    try {
      const res = await fetch(`/getBlogFile/${blogData.id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      setFile(data.file);

    } catch (error) {
      
    }
  }

  useEffect(() => {
    getFile();
  }, [])
  

  return (
    <div className='file_selector'>
      <div>
        {
          file === '' ? null :
          <CardMedia
            component={ checkFile(file) || file.includes('image') ? 'img' : 'video'}
            src={file}
            controls
          />
        }
      </div>
        <div className='file_selector_button'>
        <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleChange}
              />
              <Tooltip title='Add a photo'>
                <Button 
                  color='primary'
                  aria-label="upload picture"
                  component="span"
                  // variant="contained"
                >
                  <AddPhotoAlternateRoundedIcon />
                </Button>
              </Tooltip>
            </label>
        <label htmlFor="icon-button-file2">
              <Input
                accept="video/*"
                id="icon-button-file2"
                type="file"
                onChange={handleChange}
              />
              <Tooltip title='Add a video'>
                <Button 
                  color='primary'
                  aria-label="upload video"
                  component="span"
                  // variant="contained"
                >
                  <OndemandVideoRoundedIcon />
                </Button>
              </Tooltip>
            </label>
          
          
        </div>
    </div>
  )
}

export default FileSelector