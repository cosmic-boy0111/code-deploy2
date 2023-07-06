import React,{useContext,useEffect,useState} from 'react'
import { CardMedia, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';

import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import { useNavigate, useParams } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'initial',
  // color: theme.palette.text.secondary,
  border : 'none',
  boxShadow : 'none',
}));
const BlogCard = ({Data}) => {
  const {themeToggler,rootUser} = useContext(AppContext)
  const {tag } = useParams();
  const navigate = useNavigate();

  const [img, setImg] = useState('')

  const [blog, setBlog] = useState({
    file : ''
  })

  const [userInfo, setUserInfo] = useState({
    name : '',
    profession : ''
  })

  const getData = async() =>{
    try {
        const res = await fetch(`/getBlog/${Data.id}`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const data = await res.json();
        setBlog(data)

        const res2 = await fetch(`/getListUser/${Data.user_id}`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const data2 = await res2.json();
        // setRow(data2);
        setUserInfo(data2)
        
      const res3 = await fetch(`/getImg/${Data.user_id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data3 = await res3.json();
      setImg(data3.img)

    } catch (error) {
        console.log(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, [tag])
  
  
  const goToVideo = () =>{
    navigate(`/post/${Data.id}`)
  }
  
  const goUser = () =>{
    navigate(`/profile/${Data.user_id}`)
  }

  return (

    <div className='video_channel_card' style={{
      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      // backgroundColor:'transparent',
      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      // boxShadow:'none',
      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
      textAlign:'initial',
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
  }}>
 
    <Box sx={{ flexGrow: 1 }} >
          {/* <Grid  container spacing={1} > */}
            <Grid item  xs={12} className='point'>
              <Item onClick={goToVideo}>
              <CardMedia
                component={ blog.file.includes("video") ? 'video' : 'img'}
                src={blog.file}
                controls
              />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
              <div className='video_card_info'>
                <div className='point' >
                  <h5 style={{
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }} onClick={goToVideo}>{blog.headerTitle}</h5>
                  <small style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>Likes : {blog.likeCount}</small>
                  <div style={{
                    display:'flex',
                    alignItems:'center'
                  }}>
                  <Avatar
                aria-label="recipe"
                onClick={goUser}
              >
                {img === "" ? null : (
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                
              </Avatar>
              <div className='under_channel_card_info' onClick={goUser}>
                  <div style={{
                      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }}>{userInfo.name} </div>
                  <small style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>{userInfo.profession}</small>
              </div>
                  </div>
                </div>
                
              <div>

                <IconButton style={{
                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                  }}>
                  <MoreVertIcon />
                </IconButton>
                </div>
              </div>
              </Item>
            </Grid>
            
          {/* </Grid> */}
        </Box>

    </div>
  )
}

export default BlogCard