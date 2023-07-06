import { Avatar, IconButton, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { ChannelContext } from '../Channel';
import EditImage from './CropImg'


const ProfileUpdate = () => {

  const { channel_id } = useParams();

  const { themeToggler } = useContext(AppContext)


  const { channel, setChannel, channelImg } = useContext(ChannelContext)

  const [channelName, setChannelName] = useState(channel.name)


  const [isImg, setIsImg] = useState(true);

  const [srcImg, setSrcImg] = useState(null);
  const [crop, setCrop] = useState({ aspect: 50 / 50 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleImage = (event) => {
    setIsImg(true);
    setCrop({ aspect: 50 / 50 });
    // handleClickOpen();
    console.log(event.target.files[0]);
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    setOpen(true)
    event.target.value = "";
  };



  const handleChange = (val) => {
    setChannelName(val);
    setChannel({
      ...channel,
      name: val
    })
  }


  const updateChannelName = async () => {
    try {
      const res = await fetch('/updateChannelName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          channel_id: channel_id,
          name: channelName
        })
      })

      const data = await res.json();
      console.log(data);


    } catch (error) {

    }
  }

  useEffect(() => {
    if (channelName) {
      const updateDelay = setTimeout(() => {
        updateChannelName();
      }, 3000)

      return () => clearTimeout(updateDelay)
    }
  }, [channelName])



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Avatar
        aria-label="recipe"
        sx={{
          width: 160,
          height: 160,
          alignSelf: 'center',
        }}
      >
        {
          channelImg.img === '' ? null :
            <img
              src={channelImg.img}
              alt=''
              style={{
                width: "100%",
                height: "100%",
              }} />
        }
      </Avatar>
      <IconButton sx={{
        position: 'relative',
        top: '-2rem',
        right: '-3rem'
      }} color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={handleImage} />
        <CameraAltRoundedIcon />
      </IconButton>
      <EditImage
        open={open}
        setOpen={setOpen}
        srcImg={srcImg}
        setSrcImg={setSrcImg}
        isImg={isImg}
        crop={crop}
        setCrop={setCrop}
        completedCrop={completedCrop}
        setCompletedCrop={setCompletedCrop}
      />
      <div style={{
        marginTop: '1rem', width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} >
        <TextField
          inputProps={{
            style: {
              color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
              fontSize: '20px'
            }
          }}
          sx={{
            "& label": {
              color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
              "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
              }
            }
          }}
          style={{
            width: '80%'
          }}
          id="filled-basic"
          value={channelName}
          onChange={(e) => handleChange(e.target.value)}
          label={'Channel Name'}
          variant="standard"
        />
      </div>

    </div>
  )
}

export default ProfileUpdate
