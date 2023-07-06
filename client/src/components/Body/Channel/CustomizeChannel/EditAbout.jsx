import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import { ChannelContext } from '../Channel'

const EditAbout = () => {

    const {themeToggler} = useContext(AppContext)

    const {channel_id} = useParams();

    const {channel, setChannel} = useContext(ChannelContext);


    const [channelAbout, setChannelAbout] = useState(channel.about)


    const handleChange = (val) => {
      setChannelAbout(val);
      setChannel({
        ...channel,
        about : val
      })
    }


    const updateChannelAbout =  async() => {
      try {
        const res = await fetch('/updateChannelAbout',{
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            channel_id : channel_id,
            about : channelAbout
          })
        })
      } catch (error) {
        
      }
    }


    useEffect(() => {
      if (channelAbout) {
          const updateDelay = setTimeout(() => {
            updateChannelAbout();
          }, 3000)
  
          return () => clearTimeout(updateDelay)
      }
  }, [channelAbout])

  return (
    <div>
        <TextField
          inputProps={{
            style: {
              color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
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
            width: '100%'
          }}
          multiline={true}
          minRows={5}
          id="filled-basic"
          value={channelAbout}
          onChange={(e)=> handleChange(e.target.value)}
          label={'About Channel'}
          variant="standard"
        />
    </div>
  )
}

export default EditAbout