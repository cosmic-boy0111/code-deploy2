import React,{useState,useContext} from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { DialogContentText, Tooltip } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";


import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';

import { VideoChannelContext } from "../Videos";

import logo from "../../../../../images/assets/undraw_playlist_re_1oed.svg";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import SelectTags from './SelectTags'
import { CourseTags } from "../../../../Shared/Tags";

// import AddIcon from '@mui/icons-material/Add';

export default function SimpleDialogDemo() {

    const {themeToggler,rootUser} = useContext(AppContext)
    const {setPlayLists} = useContext(VideoChannelContext)
    
  const {user_id,channel_id} = useParams();

  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState('')
  const [tit, setTit] = useState(false)

  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const inputHandler = (e) =>{
        var value = e.target.value;
      setTit(false);
      setName(value)
  }

  const createPlaylist = async() =>{
      try {
          const res = await fetch('/createPlaylist',{
            method:'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              id : channel_id,
              name : name,
              description : description,
              course_tags : tags
            })
          })

          const Data = await res.json();
          setPlayLists((pre)=>{
            return [Data,...pre]
          })

          const resUser = await fetch('/increaseCourse',{
            method : 'GET',
            headers: {
              'Content-Type':'application/json'
            }
          })

          const userGraphRes = await fetch(`/increaseUserCourse/${rootUser._id}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          toast.success('playlist created')
          setOpen(false);
          setName('')

      } catch (error) {
          toast.error('playlist not created')
      }
  }

  return (
    <>
      <Tooltip title="Create Playlist">
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          aria-label="add"
          style={{
            marginLeft: ".5rem",
          }}
        >
          <AddIcon />
        </Button>
      </Tooltip>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle style={{
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        }} >
          <div>
          Create Course

          </div>
          <DialogContentText style={{
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
          }}>
            Share your knowledge with others for better future
        </DialogContentText>
        </DialogTitle>
       
        <div style={{
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
        }}>

        
        <DialogContent style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            // margin:'.5rem',
            padding:'1rem'
            
        }}>
         

          <img
            src={logo}
            alt=""
            srcset=""
            style={{
              width:'250px',
            }}
            />
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
                    Course Name{" "}
                    <span
                      className="Red"
                      style={{
                        display: tit ? "inline" : "none",
                      }}
                    >
                      Required
                    </span>
                    
                  </label>
                  <input type="text" value={name} onChange={inputHandler}  class="form-control bg-tp channel_name_mini" id="name" autoFocus name='name' style={{
                    // color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                    
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow
                  }}/>
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
                    Course Description{" "}
                    <span
                      className="Red"
                      style={{
                        display: tit ? "inline" : "none",
                      }}
                    >
                      Required
                    </span>
                    
                  </label>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={2}
                    id="description"
                    onChange={(e)=>{
                      setDescription(e.target.value);
                    }}
                    placeholder="Tell about your course"
                    name="description"
                    value={description}
                    class="form-control"
                    style={{
                      backgroundColor: themeToggler
                        ? Theme.Dark.FadeBackground
                        : Theme.Light.FadeBackground,
                      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                      boxShadow: themeToggler
                        ? Theme.Dark.BoxShadow
                        : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    }}
                  />
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
                    Course Tags{" "}
                    

                    
                  </label>

                  <SelectTags  tags={CourseTags} value={tags}  setValue={setTags} />
                  
            </div>
            {/* <DialogActions style={{
                width:'100%'
            }}> */}
              
        </DialogContent>
        <DialogActions className='create_dialog_action_button' style={{
              backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            }}>
            <Button
                variant="contained"
                color="primary"
                aria-label="add"
                onClick={handleClose}
                >
                Cancel
            </Button>
            <Button
                variant="contained"
                color="primary"
                aria-label="add"
                disabled={name === '' || description == '' ? true : false}
                onClick={createPlaylist}
                >
                Create
            </Button>
            </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
