import React,{useContext,useState,useEffect} from 'react'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardLoader from '../../Blog_body/BlogSkeleton'
import BlogContainer from '../../Blog_body/BlogContainer'

import { ProfileContext } from '../Profile';
import empty from '../../../../images/assets/alien.svg'

import PostTabs from './PostTabs'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserPosts = () => {

  const {themeToggler} = useContext(AppContext)
  const [posts, setPosts] = useState([])

  const {id} = useParams();

  const [load, setLoad] = useState(false)

  const getPosts = async() =>{
    try {
      setLoad(true)
      const res3 = await fetch(`/userBlogs/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const blogs = await res3.json();
      console.log(blogs);
      setPosts(blogs)
      setLoad(false)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    getPosts();
  }, [])
  

  return (
    <Item className='card_container' style={{
        // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        textAlign:'initial',
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        // backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        // border : themeToggler ? Theme.Dark.Border : Theme.Light.Border
        boxShadow:'none',
        backgroundColor:'transparent'
    }}>
        {/* load ? <CardLoader wdt={true}/> : posts.length === 0 ?
        <div className='empty_container' style={{
          // display: posts.length === 0 ? 'flex' : 'none',
          padding:'1rem'
        }}>
            <h4> No Post Yet </h4>
            <img src={empty} alt="" srcset="" className='empty_img' />
        </div> :  */}
          <PostTabs />
        
    </Item>
  )
}

export default UserPosts