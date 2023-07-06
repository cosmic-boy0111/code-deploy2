import React,{useContext,useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { IconButton } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';


import { AppContext } from '../../App';
import { Theme } from '../Theme';
import { styled } from "@mui/material/styles";

import { useNavigate } from 'react-router-dom';
import VoiceSearch from '../VoiceSearch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  
const Input = styled("input")({
  display: "none",
});
  
export default function ResponsiveDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  const {themeToggler,searchData, setSearchData, openSearch, setOpenSearch} = useContext(AppContext)
  const handleClose = () => {
    setOpenSearch(false);
  };

  const handleOpen = () =>{
    setOpenSearch(true);
  }

  const navigate  = useNavigate();
    const [search, setSearch] = useState('')

    const [data, setData] = useState([])
    const Searches = (e) =>{
        
        var text = e.target.value;
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
        setOpenSearch(false)
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
    <div>
      <IconButton color='primary' onClick={handleOpen}> <SearchRoundedIcon /> </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={openSearch}
        // maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        
      >
        <div style={{
            backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            width:'100%',
            height:'100%',
            textAlign:'initial',
            padding:'.2rem .5rem'
        }}>
            <header style={{
                display:'flex',
                // alignItems:'center',
                // flexDirection:'column',
            }}>
                <IconButton color='primary' onClick={handleClose} > <KeyboardBackspaceRoundedIcon fontSize='12px'/> </IconButton>

                <input value={search} onKeyDown={goToSearch}   onFocus={()=>Searches(search)} onChange={(e)=> Searches(e)} autoFocus type="text" name="" id="" className='header_search_bar' placeholder='Search here...' style={{
                        color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                        borderRadius:'4px',
                        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                        padding: '0 .5rem'
                    }}/>
                <VoiceSearch />
            </header>
            <section style={{
              marginTop:'.5rem',
              color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
            }}>
            {
                    data.length === 0 ? null :
                    <div className='search_result'>
                        {
                            data.map((e)=>{
                                return <div className='search_appear' style={{
                                  padding:'.5rem 0'
                                }} onClick={()=>go(e)}>
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
            </section>
        </div>
        
      </Dialog>
    </div>
  );
}
