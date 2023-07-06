import React,{useContext,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';

import icon from '../../../../../images/assets/undraw_dream_world_re_x2yl.svg'


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

import {ChannelCardContext} from '../Channels'

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

  const {user_id} = useParams();
  const [loader, setLoader] = useState(false)

  const {open,setOpen,setChannelList} = useContext(ChannelCardContext)

  const handleClose = () => {
    setOpen(false);
    setTit(false);
  };

  const [name, setName] = useState('')

  const [tit, setTit] = useState(false)

  const inputHandler = (e) =>{
    var value = e.target.value;
    setTit(false)
    setName(value);

  }

  const createChannel = async() =>{
    if(name === ''){
      setTit(true)
      return;
    }
    
    try {
      setLoader(true)
      const res = await fetch('/createChannel',{
        method:'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          id : user_id,
          name : name
        })
      })

      const channel = await res.json();


      setChannelList((pre)=>{
        return [...pre,channel];
      })

      toast.success('Channel created')
      setOpen(false)
      setLoader(false)
    } catch (error) {
      toast.error('Channel not created')
      setLoader(false)
    }


  }

  return (
    <div>
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        
      >
        <div className='create_channel_dialog' style={{
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            padding:'.5rem 1rem',
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
        }}>
            
            <div className='create_dialog_body'>
            {
              loader ? <load /> : null
            }
            <DialogTitle id="responsive-dialog-title">
              {"Create your channel"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ 
                textAlign:'center' ,
                color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
              }}>
              You can use your brand's name or another name. A good channel name represents you and your content. You can change your channel name at any time
              </DialogContentText>
            </DialogContent>
              <div className='icon_container'>
                <img src={icon} alt="" srcset="" />
              </div>

              <div class="mb-3 wd-100">
                  <label
                    for="name"
                    class="form-label"
                    style={{
                      color: tit
                        ? "#f50057"
                        : themeToggler
                        ? Theme.Dark.Color
                        : Theme.Light.Color,
                    }}
                  >
                    Channel Name{" "}
                    <span
                      className="Red"
                      style={{
                        display: tit ? "inline" : "none",
                      }}
                    >
                      Required
                    </span>
                    
                  </label>
                  <input type="text" value={name} onChange={inputHandler}  class="form-control bg-tp channel_name" id="name" autoFocus name='name' style={{
                    // color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                    backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow
                  }}/>
                </div>

            </div>
            <DialogActions className='create_dialog_action_button'>
              
              <Button onClick={handleClose} autoFocus variant='contained'>
                Back
              </Button>
              <Button onClick={createChannel} autoFocus variant='contained'>
                Create
              </Button>
            </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
