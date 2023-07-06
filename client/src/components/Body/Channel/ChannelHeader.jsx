import React,{useState,useEffect,useContext} from 'react'

import { AppContext } from '../../../App'
import { Theme } from '../../Theme'

import { Avatar } from '@mui/material'
import { Button } from '@mui/material'

import TabBars from './TabBars'
import { useParams } from 'react-router-dom'
import Customize from './CustomizeChannel/Customize'
import Manage from './ManageVideos/Manage'
import { ChannelContext } from './Channel'


const ChannelHeader = () => {

    const {themeToggler,rootUser} = useContext(AppContext)

    const {user_id,channel_id} = useParams();


    const {channel, setChannel, channelImg, setChannelImg} = useContext(ChannelContext)

  return (
      <>
        <div
        className="Header_main_body2"
        style={{
          backgroundColor: themeToggler
            ? Theme.Dark.boxColor
            : Theme.Light.boxColor,
          boxShadow: themeToggler
            ? Theme.Dark.BoxShadow
            : Theme.Light.BoxShadow,
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        }}
      >
      
        <div className="Header_main_bottom">
          <div className="logo_holder">
            <div
              className="logo_img2"
              style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.boxColor
                  : Theme.Light.boxColor,
              }}
            >
              <Avatar
                aria-label="recipe"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {channelImg.img === "" ? null : (
                  <img
                    src={channelImg.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                
              </Avatar>
            
             
            </div>
            <div className="name_role_info2">
              <h4> {channel.name} </h4>
              {
                channel.subCounts === undefined ? '' :
              <span> { channel.subCounts === 0 ? 'No Subscribers' : `${channel.subCounts} Subscribers`} </span>
              }
            </div>
          </div>
          
          <div className='channel_action'>
                  {
                    user_id === rootUser._id ? <>
                    <Customize /> 
                    <Manage />
                    </> 
                    :
                    <Button variant="contained" color='secondary' >Subscribe</Button>
                  }
            
          </div>
        </div>
        <div className="channel_tabs">
            <TabBars />
        </div>
      </div>
      </>
  )
}

export default ChannelHeader