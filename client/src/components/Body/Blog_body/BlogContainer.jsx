import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from "../../../images/assets/code.jpg"
import TemporaryDrawer from './CreateBlog'

import { checkFile } from '../../Shared/Functions';


import { AppContext } from '../../../App'
import { BlogContext } from './Blog'
import { Theme } from '../../Theme';
import BasicMenu from './BasicMenu';

import { Button } from '@mui/material';

import { RWebShare } from "react-web-share";

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import blog_img_file from '../../../images/assets/undraw_inspiration_re_ivlv.svg'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ blog, wdt = false, isShare = false, isEdit = true, isWidth = false, isExtra = false, isRad = false }) {


  const [expanded, setExpanded] = React.useState(false);

  const { themeToggler, rootUser, setToggle, blogs, setBlogs, setIsEdit, setBlogData } = useContext(AppContext)

  const [isLike, setIsLike] = React.useState(false)

  const [img, setImg] = useState('')

  const [likes, setLikes] = useState(blog.likeCount)

  const [file, setFile] = useState('')

  const [userMeatData, setUserMeatData] = useState({
    name: '',
    profession: ''
  })

  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const makeLike = async () => {
    try {

      if (!isLike) {
        setLikes(likes + 1)
        setIsLike(!isLike);
        const res = await fetch(`/addLike/${blog._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const res2 = await fetch('/addLikeBlog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: rootUser._id,
            blogId: blog._id
          })
        })

        if (res.status === 400) return;
      } else {
        setLikes(likes - 1)
        setIsLike(!isLike);
        const res = await fetch(`/subLike/${blog._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const res2 = await fetch('/subLikeBlog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: rootUser._id,
            blogId: blog._id
          })
        })

        if (res.status === 400) return;
      }

    } catch (error) {
      console.log(error);
    }

  }

  const go = () => {
    navigate(`/profile/${blog.userId}`)
  }

  const deleteBlog = async () => {

    console.log(blog._id);

    try {

      const res = await fetch(`/deleteBlog/${blog._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('under delete');
      // const res2 = await fetch(`/decAllFieldGraph/${0}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      console.log(res);

      if (res.status === 200) {

        toast.success('blog deleted')

        // setBlogs((pre) => {
        //   return pre.filter((e) => {
        //     return e._id !== blog._id
        //   });
        // })

        setBlogs((pre)=>{
          var arr = [];
          console.log(pre);
          arr = pre.filter((e) => e._id !== blog._id );
          console.log(arr);
          return arr;
        })

      } else {
        toast.error('blog not deleted')
      }


    } catch (error) {
      console.log(error);
    }


  }


  const editBlog = () => {
    console.log(blog);
    setToggle(true);
    setIsEdit(true);
    setBlogData({
      id: blog._id,
      headerTitle: blog.headerTitle,
      description: blog.description,
      likeCount: blog.likeCount
    })
    console.log('under edit');
  }




  const getFile = async () => {
    try {
      const res = await fetch(`/getBlogFile/${blog._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setFile(data.file);


      const user = await fetch('/about', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const userData = await user.json();

      const res4 = await fetch(`/getLikeArray/${userData._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const list = await res4.json();
      console.log(list);
      if (list.find(element => element === blog._id) !== undefined) {
        setIsLike(true);
      }

      const res2 = await fetch(`/getListUser/${blog.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data2 = await res2.json();
      setUserMeatData(data2)

      const res3 = await fetch(`/getImg/${blog.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data3 = await res3.json();
      console.log(blog.userId === rootUser._id);
      setImg(data3.img)


    } catch (error) {

    }
  }

  useEffect(() => {
    getFile();
  }, [blog])

  const goTo = () => {
    navigate(`/post/${blog._id}`);
  }

  return (
    <div>
      {
        file ?
        <CardMedia
        component={checkFile(file) ? 'img' : 'video'}
        src={file}
        controls
        height={isWidth ? '50%' : '200'}
        onClick={goTo}
        style={{
          borderRadius: isRad ? '5px' : '5px 5px 0 0',
          cursor: 'pointer',
          objectFit:'fill'
        }}
        /> : <CardMedia
        component={'img'}
        src={blog_img_file}
        controls
        height={isWidth ? '50%' : '200'}
        onClick={goTo}
        style={{
          borderRadius: isRad ? '5px' : '5px 5px 0 0',
          //objectFit: 'cover',
          cursor: 'pointer',
          objectFit:'fill'
        }}
        />
      }
      {
        isExtra ? null :
          <CardContent
          onClick={goTo}
          >
            <div style={{
              width: '100%',
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: 'nowrap',
              cursor:'pointer'
            }}>
              {blog.headerTitle}
            </div>


          </CardContent>
      }

      <CardActions disableSpacing>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {
            isExtra ? 
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <Avatar src={img} className='point' >
            </Avatar>
            <div style={{
              marginLeft: '.5rem'
            }}>
              <div>{userMeatData.name}</div>
              <div>{userMeatData.profession}</div>
            </div>
          </div> : null
          }

          <div>
            <IconButton aria-label="add to favorites" style={{
              color: isLike ? '#f50057' : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,

            }}
              onClick={makeLike}

            >
              <FavoriteIcon />
            </IconButton>

            <RWebShare
              data={{
                text: "check out this amazing post",
                url: `${window.location.origin}/post/${blog._id}`,
                title: "Code++",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <IconButton aria-label="share" style={{
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
              }}>
                <ShareIcon />
              </IconButton>
            </RWebShare>
          </div>

          {
            blog.userId === rootUser._id && !isShare && isEdit ?
              <BasicMenu deleteBlog={deleteBlog} editBlog={editBlog} /> : null
            // <Button variant='contained'  size='small' > follow </Button>
          }
        </div>
      </CardActions>
    </div>
  );
}


