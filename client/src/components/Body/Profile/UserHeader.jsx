import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { Theme } from "../../Theme";
import { CardMedia } from "@mui/material";
import TabBar from "./TabBar";
import { Avatar } from "@mui/material";
import { ProfileContext } from "./Profile";
import { Tooltip, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import logo from "../../../images/assets/alien.svg";
import EditImage from './EditProfile/EditImage'
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import userImg from '../../../images/icon/avatar.svg'

const Input = styled("input")({
  display: "none",
});
const UserHeader = () => {
  const { themeToggler, rootUser } = useContext(AppContext);
  const { user } = useContext(ProfileContext);

  
  const [isImg, setIsImg] = useState(true);
  
  const [srcImg, setSrcImg] = useState(null);
  const [crop, setCrop] = useState({ aspect: 50 / 50 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleImage = (event) => {
    if(user._id !== rootUser._id) return;
    setIsImg(true);
    setCrop({ aspect: 50 / 50 });
    // handleClickOpen();
    console.log(event.target.files[0]);
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    setOpen(true)
    event.target.value = "";
  };

  const handleBgImage = (event) => {
    if(user._id !== rootUser._id) return;
    setIsImg(false);
    setCrop({ });
    // handleClickOpen();
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    setOpen(true)
    event.target.value = "";
  };



  return (
    <>
      <div
        className="Header_main_body"
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
      {
        user._id !== rootUser._id ? null :
        <label className="photo_button2">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleBgImage}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label> 
      }
        <CardMedia
          component="img"
          height="200"
          image={
            
            user.bgImg === "" ? "https://uko-react.vercel.app/static/background/user-cover-pic.png":
            user.bgImg
          }
          alt=""
          // srcSet="https://uko-react.vercel.app/static/background/user-cover-pic.png"
          style={{
            objectFit: 'cover'
          }}
        />
        
        <div className="Header_main_bottom">
          <div className="logo_holder">
            <div
              className="logo_img"
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
               {
                user.img === "" ? null :
                  <img
                  src={user.img}
                  alt=''
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  />
                }
              </Avatar>
              {
                user._id !== rootUser._id ? null :
              <label className="photo_button">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleImage}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              }
              <EditImage
                open={open}
                setOpen={setOpen}
                srcImg={srcImg}
                setSrcImg={setSrcImg}
                isImg={isImg}
                crop = {crop}
                setCrop = {setCrop}
                completedCrop = {completedCrop}
                setCompletedCrop = {setCompletedCrop}
              />
            </div>
            <div className="name_role_info">
              <span> {user.name} </span>
              <span> {user.profession} </span>
            </div>
          </div>
          
          <div className="tabs">
            <TabBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
