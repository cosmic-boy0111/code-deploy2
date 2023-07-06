import React,{useContext,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";

import { Tooltip } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";

import LinearProgress from '../../../Shared/LinearProgress'

import { ProfileContext } from '../Profile';
import axios from 'axios'

const Input = styled("input")({
  display: "none",
});

export default function ScrollDialog({
    open,
    setOpen,
    srcImg,
    setSrcImg,
    isImg,
    crop,
    setCrop,
    completedCrop, 
    setCompletedCrop
}) {


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  
  const {  themeToggler } = useContext(AppContext);
  const { user, setUser } = useContext(ProfileContext)

  const [image, setImage] = useState(null);
  const [pro, setPro] = useState(false)

  const handleImage = (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
  };

  function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
      return new File([u8arr], filename, {type:mime});
  }

  const getCroppedImg = async () => {
    try {
      setPro(true)
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const pixelRatio = window.devicePixelRatio;
      const ctx = canvas.getContext("2d");

      canvas.width = scaleX * crop.width * pixelRatio  ; 
    canvas.height = scaleY * crop.height * pixelRatio ; 
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
        // crop.width ,
        // crop.height 
      );

      const base64Image = canvas.toDataURL("image/png", 1);
      var file =  dataURLtoFile(base64Image,'profile.png');
      console.log(file);
      // file = JSON.stringify(file)
        let res ;
      if(isImg){
        // res = await fetch('/addImg',{
        //   method : 'POST',
        //   headers : {
        //     'Content-type' : 'application/json'
        //   },
        //   body : JSON.stringify({
        //     id : user._id,
        //     img : base64Image
        //   })
        // })
        const formData = new FormData()
        formData.append('file', file)
        console.log('before axios');
        axios.post(`/addImg/${user._id}`, formData, {
        }).then(res => {
          setUser({ ...user, img: res.data.img })
        })
      }else{
        // res = await fetch('/addBgImg',{
        //   method : 'POST',
        //   headers : {
        //     'Content-type' : 'application/json'
        //   },
        //   body : JSON.stringify({
        //     id : user._id,
        //     img : base64Image
        //   })
        // })

        const formData = new FormData()
        formData.append('file', file)
        console.log('before axios');
        axios.post(`/addBgImg/${user._id}`, formData, {
        }).then(res => {
          setUser({ ...user, bgImg: res.data.bgImg })
        })
      }
      
      // if(res.status !== 200){
      //   return;
      // }

      // isImg
      //   ? setUser({ ...user, img: base64Image })
      //   : setUser({ ...user, bgImg: base64Image });
        setOpen(false);
      
        setPro(false);





    } catch (e) {
      console.log("crop the image");
      console.log(e);
      setPro(false)
    }
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
      {/* <div 
        style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.BodyBackgroundColor
                  : Theme.Light.BodyBackgroundColor,
                color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
              }}> */}
        <div style={{
          display :pro ? 'block' : 'none'
        }}>

        <LinearProgress />
        </div>
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: themeToggler
              ? Theme.Dark.boxColor
              : Theme.Light.boxColor,
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            padding :'.5rem 1rem'
          }}
        >
          <span>Crop Image </span>
          <IconButton color="primary" onClick={()=>setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            // className='problem_body'
            style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.BodyBackgroundColor
                  : Theme.Light.BodyBackgroundColor,
                color: themeToggler ? Theme.Dark.fadeColor : 'none',
            }}

          >
          <div
            style={{
              display: srcImg === null ? "none" : "block",
            }}
          >
            {srcImg && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactCrop
                  style={{ maxWidth: window.width > 662 ? '50%' : "100%", margin:'.5rem' }}
                  src={srcImg}
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              </div>
            )}
          </div>
          </DialogContentText>
        </DialogContent>
        {/* </div> */}
        
        <DialogActions style={{
          backgroundColor: themeToggler
              ? Theme.Dark.boxColor
              : Theme.Light.boxColor,
            color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              // margin: "1rem 0",
              // position:'absolute',
              // bottom:'1.5rem'
            }}
          >
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleImage}
              />
              <Tooltip title="Choose Image">
                <Button
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  variant="contained"
                >
                  <PhotoCamera />
                </Button>
              </Tooltip>
            </label>
            <label>
              <Tooltip title="Crop Image">
                <Button
                  color="primary"
                  component="span"
                  style={{
                    display: srcImg === null ? "none" : "flex",
                  }}
                  variant="contained"
                  onClick={getCroppedImg}
                >
                  <CropIcon />
                </Button>
              </Tooltip>
            </label>
          </div>
          </DialogActions>
      </Dialog>
    </div>
  );
}
