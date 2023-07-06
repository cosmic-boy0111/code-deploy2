import React,{useEffect,useState,useContext} from 'react'
import { Avatar } from '@mui/material'
import { Button } from '@mui/material'

import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'

import { ChannelCardContext } from '../Channels'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { Tooltip } from '@mui/material'
import { toast } from 'react-toastify'

import { useParams, useNavigate } from 'react-router-dom'

const ChannelCard = ({data}) => {

    const navigate = useNavigate();

    const [channelImg, setChannelImg] = useState({})
    const {themeToggler,rootUser} = useContext(AppContext)

    const {user_id} = useParams();

    const {setChannelList} = useContext(ChannelCardContext)

    const getImage = async() =>{
        try {
            const res2 = await fetch(`/getChannelImg/${data._id}`,{
                method:'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
    
            const Data2 = await res2.json();
            setChannelImg(Data2)
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getImage();
    }, [])
    

    const setActiveChannel = async() =>{
      try {
        
        const res = await fetch(`/setActiveChannel/${user_id}/${data._id}`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        

        toast.success('channel changed')
        navigate(`/channel/${user_id}/${data._id}`)
      } catch (error) {
        toast.error('channel not change')
      }
    }

    const deleteChannel = async() => {
      if( ! window.confirm('You really want to delete ?')){
        return;
      }
      try {
        const res = await fetch(`/deleteChannel/${user_id}/${data._id}`, {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        toast.success('channel deleted')
        setChannelList((pre)=>{
          return pre.filter((e)=>{
            return e._id !== data._id;
          })
        })
      } catch (error) {
        console.log(error);
        toast.error('channel not deleted')
      }
    }


  return (
    <div className='channel_card'>
        <div className='card_channel_info'>
        <Avatar
                aria-label="recipe"
                
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
              <div className='under_channel_card_info' >
                  <div style={{
                      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }}>{data.name} </div>
                  <div style={{
                      color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>{data.subCounts === 0 ? 'No Subscribers' : `${data.subCounts} Subscribers` }</div>
              </div>
        </div>
        {
          user_id === rootUser._id ? 
        <div className='change_channel_button'>
          <Tooltip title="Use Channel">
            <Button color='success'  variant='contained' onClick={setActiveChannel}> set </Button>
          </Tooltip>
          {/* <Tooltip title="Delete Channel">
            <Button color='secondary' onClick={deleteChannel}> <DeleteOutlineRoundedIcon /> </Button>
          </Tooltip> */}
        </div> : null
        }
    </div>
  )
}

export default ChannelCard