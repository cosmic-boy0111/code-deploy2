import React,{useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'

import {AppContext} from '../../../App'
import {Theme} from '../../Theme'
import BlogCard from './TagCards/BlogCard'
import BlogCardRes from './TagCards/BlogCardRes'
import ChannelCard from './TagCards/ChannelCard'
import ProblemCard from './TagCards/ProblemCard'
import UserCard from './TagCards/UserCard'
import VideoCard from './TagCards/VideoCard'
import VideoCardRes from './TagCards/VideoCardRes'
const SearchResult = () => {

    const {tag} = useParams();

    
    useEffect(() => {
        window.scroll(0,0)
    }, [tag]);

    const {themeToggler,setOpenSearch} = useContext(AppContext)

    const [data, setData] = useState([])
    const Searches = async() =>{
        setOpenSearch(false)
        const res = await fetch('/getSearch',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const searchData = await res.json();
        
        const arr = searchData.filter((e)=>{
            return (e.title.toLowerCase()).includes(tag.toLowerCase());
        })
        

        setData(arr)

    }

    useEffect(() => {
      Searches();
    }, [tag])
    

    const getCard = (e) =>{
        switch (e.tag) {
            case 'video':
                return ( window.screen.width <= '600' ? <VideoCardRes Data={e}/> : <VideoCard Data={e}/>);
            case 'blog':
                return (window.screen.width <= '600' ? <BlogCardRes Data={e} /> : <BlogCard Data={e}/> );
            case 'problem':
                return <ProblemCard Data={e}/>;
            case 'user':
                return <UserCard Data={e}/>;
            case 'channel':
                return <ChannelCard Data={e}/>;
        
            default:
                break;
        }
    }

  return (
    <div>
    {
        data.map((e)=>{
            return getCard(e);
        })
    }
    </div>
  )
}

export default SearchResult