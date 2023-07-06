import React,{useState,useEffect, useContext} from 'react'
import BlogContainer from '../../../Blog_body/BlogContainer'
import { useParams }  from 'react-router-dom'
import empty from '../../../../../images/assets/alien.svg'
import CardLoader from '../../../Blog_body/BlogSkeleton'


import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Posts = () => {

    const [posts, setPosts] = useState([])
    const {themeToggler}  = useContext(AppContext);

    
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
    <>
        {
             load ? <CardLoader wdt={true}/> : posts.length === 0 ?
        <div className='empty_container' style={{
          // display: posts.length === 0 ? 'flex' : 'none',
          padding:'1rem'
        }}>
            <h4> No Post Yet </h4>
            <img src={empty} alt="" srcset="" className='empty_img' />
        </div> : 
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ paddingTop: '0' }}>
              {

                posts.map((e) => {
                  return <Grid item xs={4} sm={4} md={4}>
                    <Item className='card_container' style={{
                      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      textAlign: 'left',
                      padding: '0',
                      borderRadius: '5px',
                      color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                    }}>
                      <BlogContainer blog={e} />
                    </Item>
                  </Grid>
                })
              }
            </Grid>
          </Box>
          }
    </>
  )
}

export default Posts