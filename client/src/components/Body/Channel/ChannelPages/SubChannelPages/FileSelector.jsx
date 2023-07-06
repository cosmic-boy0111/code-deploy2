import React, { useState, useEffect, useContext } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import { Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import VideoSnapshot from 'video-snapshot';


import icon from "../../../../../images/assets/undraw_online_media_re_r9qv.svg";

import { AppContext } from "../../../../../App";
import { Theme } from "../../../../Theme";
import { height } from "@mui/system";
const Input = styled("input")({
  display: "none",
});

const FileSelector = ({ video, setVideo }) => {
  const { themeToggler } = useContext(AppContext);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // const [playFile, setPlayFile] = useState('')

  // const [file, setFile] = useState(null)

  const handleChangeVideo = async (e) => {
    // setFile(e.target.files[0])
    const snapshoter = new VideoSnapshot(e.target.files[0]);
    const previewSrc = await snapshoter.takeSnapshot();
    
    setVideo({ ...video,thumbnail : '', file: await toBase64(e.target.files[0]), headerTitle :   e.target.files[0].name.split(".")[0]});


    console.log(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <div className="create_dialog_body" style={{
      backgroundColor: themeToggler
        ? Theme.Dark.BodyBackgroundColor
        : Theme.Light.BodyBackgroundColor,
      // padding:'.5rem 0rem',
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      height:'100vh'
    }}>
      

      <div className="video_icon">
        <img src={icon} alt="" srcset="" />
      </div>
      <div className="file_selector">
        <div className="file_selector_button">
          <label htmlFor="icon-button-file2">
            <Input
              accept="video/*"
              id="icon-button-file2"
              type="file"
              onChange={ handleChangeVideo}
            />
            <Button
              color="primary"
              aria-label="upload video"
              component="span"
              variant="contained"
            >
              select File
            </Button>
          </label>
        </div>
      </div>
      <DialogContent>
        <DialogContentText
          style={{
            textAlign: "center",
            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
          }}
        >
          By submitting your videos to Code++, you acknowledge that you agree to
          Code++'s Terms of Service and Community Guidelines.
        </DialogContentText>
        <DialogContentText
          style={{
            textAlign: "center",
            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
          }}
        >
          Please make sure that you do not violate others' copyright or privacy
          rights.
        </DialogContentText>
      </DialogContent>
    </div>
  );
};

export default FileSelector;
