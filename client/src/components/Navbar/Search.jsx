import React,{useContext,useState,useEffect} from 'react'
import { AppContext } from '../../App'
import search_icon from '../../images/icon/search.png'
import { Theme } from '../Theme'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import SearchDialog from './SearchDialog'
import VoiceSearch from '../VoiceSearch';

const Search = () => {
    const navigate  = useNavigate();
    const {themeToggler,searchData, setSearchData} = useContext(AppContext)
    // const [searchData, setSearchData] = useState([])
    const [search, setSearch] = useState('')

    const [data, setData] = useState([])
    const Searches = (text) =>{
        setSearch(text)
        if(text === '' || text === ' ' ){
            setData([])
            return;
        }

        const arr = searchData.filter((e)=>{
            return (e.title.toLowerCase()).includes(text.toLowerCase());
        })
        
        setData(arr.slice(0,14))


    }

    const getSearch = async() =>{
        try {
            const res = await fetch('/getSearch',{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const Data = await res.json();
            console.log(Data);
            setSearchData(Data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getSearch();
    }, [])


    const go = (e) =>{
        if(e.tag === 'user'){
            navigate(`/profile/${e.id}`)
        }else if(e.tag === 'blog'){
            navigate(`/post/${e.id}`)
        }else if(e.tag === 'channel'){
            navigate(`/channel/${e.user_id}/${e.id}`)
        }else if(e.tag === 'video'){
            navigate(`/video/${e.id}`)
        }else if(e.tag === 'problem'){
            navigate(`/compiler/${e.title}/${e.id}`)
        }
        setData([])
    }
    
    const goToSearch = (e) =>{
        if(search === '') return;
        if (e.key === 'Enter') {
            navigate(`/yoursearch/${search}`)
            setData([])
            setSearch('')
        }
    }

  return (
      <>
        {
                    window.screen.width <= '600'  ? <SearchDialog /> : 
          <div className='header_search' style={{
            //   border : themeToggler ? Theme.Dark.Border : Theme.Light.Border
          }}>   
                
                <div className='search_box'  style={{
                    backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                }}>
                    <img src={search_icon} alt="" srcset="" className='search_icon'/>
                    <input value={search} onKeyDown={goToSearch}  onFocus={()=>Searches(search)} onChange={(e)=> Searches(e.target.value)} type="text" name="" id="" className='header_search_bar' placeholder='Search here...' style={{
                        color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                    }}/>
                    <VoiceSearch />
                </div>
                {
                    data.length === 0 ? null :
                    <div className='search_result' style={{
                        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    }}>
                        {
                            data.map((e)=>{
                                return <div className='search_appear' onClick={()=>go(e)}>
                                    <SearchIcon style={{
                                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    marginRight:'.5rem'
                                }}/> <div className='search_info'> <span> {e.title} </span> {" "} <span style={{
                                    color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    marginLeft:'.5rem'
                                }} >({e.tag})</span> </div>
                                </div>
                            })
                        }
                    </div>
                }
                
            </div>
        }
      </>
  )
}

export default Search