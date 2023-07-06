import React,{useContext,useEffect,useState,createContext} from 'react'
import '../../../style/Body/Blog.css'
import search from '../../../images/icon/search.png'
import BlogContainer from './BlogContainer'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TemporaryDrawer from './CreateBlog'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme';
import SearchIcon from '@mui/icons-material/Search';
import { CardMedia, IconButton } from '@mui/material';
import BlogSkeleton from './BlogSkeleton'
import EmptyBlog from './EmptyBlog';
import BlogHeader from './BlogHeader';

import blog_img from '../../../images/assets/post.svg'

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

export const  BlogContext = createContext()

const Blog = () => {


    const {themeToggler,setToggle,setIsEdit,setBlogData,blogs, setBlogs} = useContext(AppContext)
    const [wdt, setWdt] = useState(false)
    
    useEffect(() => {
        var myDiv = document.getElementsByTagName("body")[0];
        myDiv.scrollTop = 0;
        window.scrollTo(0, 0);
    }, []);
    
    const [actualBlog, setActualBlog] = useState([])

    const [blogLoading, setBlogLoading] = useState(false);

    const getBlogs = async() =>{
        try {
            setBlogLoading(true);
            const userRes = await fetch('/about', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
        
              const userData = await userRes.json()

            const res = await fetch('/suggestedBlogsAccordingToLikeBlogs',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    id : userData._id
                })
            })

            const data = await res.json();
            setBlogs(data);
            
            setActualBlog(data);
            console.log(data);
            setBlogLoading(false);

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
      getBlogs()
    }, [])
    
    

    const addBlog = () =>{
        setToggle(true)
        setIsEdit(false);
        setBlogData({
            id : '',
            headerTitle : '',
            file : '',
            description : ''
        })
    }

    const [temp, setTemp] = useState(true);


    const findBlogs = (search_text) =>{

        if(search_text === '' || search_text === ' ' ){
            setBlogs(actualBlog)
            return;
        }

        const arr = actualBlog.filter((e)=>{
            return (e.headerTitle.toLowerCase()).includes(search_text.toLowerCase());
        })

        setTemp(!(arr.length === 0))

        setBlogs(arr)

    }

    return (
        <BlogContext.Provider value={{ }}>
            
            {/* <div className='search_blog' style={{
                 backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                 color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                 boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                 border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
            }}>
                <IconButton color='primary' onClick={()=>setWdt(!wdt)} > <SearchIcon /> </IconButton>
                <input type="text" name="" id="" autoFocus={true} onChange={(e)=>findBlogs(e.target.value)} className='search_bar' placeholder='Search blog...' style={{
                    display : wdt ? 'block' : 'none',
                    color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                }}/>
            </div> */}
                {/* <BlogHeader /> */}
            <section className='blog_body body_margin'>
                {
                    blogLoading ? <>
                        <BlogSkeleton />
                    </> : blogs.length === 0 && temp ? <EmptyBlog /> : <>
                    {

                        <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md:12}} style={{ paddingTop:'0' }}>
                            <Grid item xs={4} sm={4} md={4}>
                                <Item className='card_container' style={{
                                    // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                    // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                    // border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                                    // textAlign:'left',
                                    padding:'0',
                                    borderRadius:'10px',
                                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    backgroundColor:'transparent',
                                    boxShadow:'none'
                                }}>
                                    <h3> Blogs and Articals </h3>
                                    <CardMedia
                                        component={ 'img' }
                                            src={blog_img}
                                            controls
                                           
                                    />
                                </Item>
                            </Grid>
                            {
                                blogs.map((blog)=>{
                                    return  <Grid item xs={4} sm={4} md={4}>
                                    <Item className='card_container' style={{
                                        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                        border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                                        textAlign:'left',
                                        padding:'0',
                                        borderRadius:'5px',
                                        color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    }}>
                                        <BlogContainer blog={blog} />
                                    </Item>
                                    </Grid>
                                    
                                    
                                })

                            }
                        </Grid>
                        </Box>

                    }
                    </>
                }
                
            </section>
            <div className='create_post'>
                <Fab color="primary" aria-label="add" onClick={addBlog}>
                    <AddIcon />
                </Fab>
            </div>
            <TemporaryDrawer />
        </BlogContext.Provider>
    )
}

export default Blog

