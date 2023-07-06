import React, { useState, useEffect, useContext } from "react";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { AppContext } from "../../../../../App";
import { Theme } from "../../../../Theme";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import CardMedia from "@mui/material/CardMedia";
import VideoThumbnail from "react-video-thumbnail";

import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";

import { styled } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";

import Tag from './SelectPlayList'


import Grid from '@mui/material/Grid';
import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';

import { Button } from '@mui/material'

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CreatePlaylist from './CreatePlaylist'
import SelectTech from './SelectTach'
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Input = styled("input")({
  display: "none",
});

const VideoUploadForm = ({ video, setVideo, tit, setTit, thumb, setThumb }) => {
  const { themeToggler } = useContext(AppContext);


  // const [dec, setDec] = useState(false);


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





  const [selected, setSelected] = useState(false);
  const [toggle, setToggle] = useState(false)

  const getDescription = async () => {
    try {

      const formData = new FormData()
      formData.append('file', dataURLtoFile(video.thumbnail,'sample.png'))
      await axios.post(`/generate_caption`, formData, {
      }).then(res => {
        console.log(res);
        // setChannelImg({ ...channelImg, img: res.data.img })
        setVideo({ ...video, 
          headerTitle : video.title,
          description : res.data.result,
          thumbnail : video.thumbnail ,
          playlist_id : video.playlist_id
        } );
      })

    } catch (error) {

    }
  }

  useEffect(() => {
    // getDescription();
  }, [toggle])

  const [tempThumb, setTempThumb] = useState(video.thumbnail);
  const [tempThumb2, setTempThumb2] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChangeImage = async (e) => {
    // setFile(e.target.files[0])
    setSelected(true);
    setThumb(false);
    var imageUrl  = await toBase64(e.target.files[0])

    setVideo({ ...video, thumbnail: imageUrl });
    setToggle(!toggle)
    setTempThumb2(await toBase64(e.target.files[0]));


    const formData = new FormData()
    formData.append('file', e.target.files[0]);
    await axios.post(`/generate_caption`, formData, {
    }).then((res) => {
      console.log(res);
      // setChannelImg({ ...channelImg, img: res.data.img })
      setVideo({ 
        ...video, 
        description : res.data.result,
        thumbnail : imageUrl,
      } );
    })

    console.log(e.target.files[0]);
    e.target.value = "";
  };
  
  const changeTempThumb = () => {
    setSelected(false);
    setVideo({ ...video, thumbnail: tempThumb });
    setToggle(!toggle)
  };
  
  const changeTempThumb2 = () => {
    setSelected(true);
    setVideo({ ...video, thumbnail: tempThumb2 });
    setToggle(!toggle)
  };


  const handleInputChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    if (name === 'headerTitle') {
      setTit(false);
    }

    setVideo({ ...video, [name]: value })

  }

  return (
    <div
      className="create_dialog_body"
      style={{
        backgroundColor: themeToggler
          ? Theme.Dark.BodyBackgroundColor
          : Theme.Light.BodyBackgroundColor,
        // padding:'.5rem 0rem',
        color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      }}
    >
      <CardMedia
        className="video_card_media"
        component={"video"}
        src={video.file}
        controls
      />
      {/* <div class="mb-3 mt-3 wd-100">
        <label for="playlist" class="form-label">
            Select Technology
        </label>
        <SelectTech video={video} setVideo={setVideo}/>
            
      </div> */}
      <div class="mb-3 mt-2  wd-100">
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
          Title{" "}
          <span
            className="Red"
            style={{
              display: tit ? "inline" : "none",
            }}
          >
            Required
          </span>
        </label>
        <input
          type="text"
          // onChange={inputHandler}
          class="form-control bg-tp"
          id="name"
          placeholder="Add a title that describes your video"
          autoFocus
          value={video.headerTitle}
          onChange={handleInputChange}
          name="headerTitle"
          style={{
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor: themeToggler
              ? Theme.Dark.FadeBackground
              : Theme.Light.FadeBackground,
            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,

            // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow
          }}
        />
      </div>
      <div class="mb-3 wd-100">
        <label
          for="description"
          class="form-label"
        // style={{
        //   color: dec
        //     ? "#f50057"
        //     : themeToggler
        //     ? Theme.Dark.Color
        //     : Theme.Light.Color,
        // }}
        >
          Description{" "}
          {/* <span
            className="Red"
            style={{
              display: dec ? "inline" : "none",
            }}
          >
            Required
          </span> */}
        </label>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          id="description"
          onChange={handleInputChange}
          placeholder="Tell viewers about your video"
          name="description"
          value={video.description}
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
        <label for="description" class="form-label"
          className={thumb ? "Red" : ""}
        >
          Thumbnail{" "}
          <span
            className="Red"
            style={{
              display: thumb ? "inline" : "none",
            }}
          >
            Required
          </span>
        </label>

        <div>
          <small
            style={{
              color: themeToggler
                ? Theme.Dark.fadeColor
                : Theme.Light.fadeColor,
            }}
          >
            Select or upload a picture that shows what's in your video. A good
            thumbnail stands out and draws viewers' attention
          </small>
        </div>
        <div className="thumbnail_container" style={{
          display:'flex',
          width:'100%',
          justifyContent:'center'
        }} >
          {tempThumb2 === '' ?
            <label
              htmlFor="icon-button-file2"
              className={`thumbnail_temp`}
              style={{
                border: selected ? "none" : "2px dotted rgb(168, 168, 168)",
              }}
            >
              <Input
                accept="image/*"
                id="icon-button-file2"
                type="file"
                onChange={handleChangeImage}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height:'150px',
                  justifyContent:'center'
                }}
              >

                <AddAPhotoRoundedIcon color="primary" />
                <span>Select Thumbnail</span>
              </div>
            </label> :
            <div className={`thumbnail`} onClick={changeTempThumb2}>
              <CardMedia
                component="img"
                height={140}
                src={video.thumbnail}
                alt="green iguana"
                style={{
                  border: !selected ? "none" : `2px solid #1976d2`,
                  height:'150px'
                }}
              />
              <label htmlFor="icon-button-file" style={{
                // position:'absolute',
                // top:'0',
                // left:'1rem',
                position: 'relative',
                bottom: '2.5rem'
              }}>
                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeImage} />
                <IconButton color="secondary" aria-label="upload picture" component="span">
                  <AddAPhotoRoundedIcon />
                </IconButton>
              </label>
            </div>
          }

          {/* <div className={`thumbnail`} onClick={changeTempThumb}>
            <CardMedia
              component="img"
              height={150}
              image={tempThumb}
              alt="green iguana"
              style={{
                border: selected ? "none" : `2px solid #1976d2`,
              }}
            />
          </div> */}
        </div>
      </div>
      <div class="mb-3 wd-100">
        <label for="playlist" class="form-label">
          Select Course
        </label>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'stretch',
        }}>
          <Tag video={video} setVideo={setVideo} />

          <CreatePlaylist />
        </div>


      </div>

    </div>
  );
};

export default VideoUploadForm;
