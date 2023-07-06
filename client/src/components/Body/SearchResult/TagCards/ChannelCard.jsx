import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import React,{useState,useEffect,useContext} from 'react'

import App, { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import { useNavigate } from 'react-router-dom'

import { Avatar , Button } from '@mui/material'
const ChannelCard = ({Data}) => {

  const navigate = useNavigate();

  const {themeToggler,rootUser} = useContext(AppContext)
  
  const [channelInfo, setChannelInfo] = useState({})


  const getChannel = async() =>{
    try {
      const res = await fetch(`/getChannel/${Data.id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      const res2 = await fetch(`/getChannelImg/${Data.id}`,{
        method:'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const Data2 = await res2.json();

      setChannelInfo({
        name : data.name,
        img  : Data2.img,
        subCounts : data.subCounts
      })


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChannel();
  }, [])


  const go = () =>{
    console.log('go');
    navigate(`/channel/${Data.user_id}/${Data.id}`)
  }
  

  return (
    <div>
      <div className='video_channel_card'   style={{
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
          // backgroundColor:'transparent',
          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
          // boxShadow:'none',
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
          textAlign:'initial',
          color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          cursor:'pointer',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          flexWrap:'wrap'
          
      }}>
       <div className="Header_main_bottom" onClick={go} style={{
         padding:'0'
       }}>
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
            
             
            </div>
            <div className="name_role_info2">
              <h4> {channelInfo.name} </h4>
              <span> { channelInfo.subCounts === 0 ? 'No Subscribers' : `${channelInfo.subCounts} Subscribers`} </span>
            </div>
          </div>
          
          
        </div>
        
      <div className='channel_action'>
                  {
                    Data.user_id === rootUser._id ? null :
                    <Button variant="contained" color='secondary' >Subscribe</Button>
                  }
            
          </div>
      </div>
    </div>
  )
}

export default ChannelCard