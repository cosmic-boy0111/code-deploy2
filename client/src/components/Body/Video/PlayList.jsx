import React,{useState,useEffect,useContext} from 'react'
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import Playlist_Card from './Cards/Playlist_card';


import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const PlayList = ({playlist_id}) => {

  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const [playlist, setPlaylist] = useState({})
  const { themeToggler } = useContext(AppContext)
  const [playlistData, setPlaylistData] = useState([])


  const getListData = async () =>{
    try {

      const res = await fetch(`/getPlaylistById/${playlist_id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      setPlaylist(data);
      console.log(data);

      const resList = await fetch(`/getPlayListsDataById/${playlist_id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const dataList = await resList.json();
      console.log(dataList);
      setPlaylistData(dataList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListData();
  }, [])
  
  

  return (
    <>

    <div className='playlist_data_container' style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      
                      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                      textAlign:'initial',
                      padding:'.5rem',
                      borderRadius:'4px'
                  }}> 
      <header className='playlist_header' style={{
        backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor
      }}>
        <div style={{
                    width: '70%',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: 'nowrap',
                    fontSize: '15px'
                }}
        >{playlist.name}</div>
        <div>
          {playlist.videoCount}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>
      </header>
      <div className='playlist_videos' style={{
        maxHeight : expanded ? '0vh' : '65vh'
      }}>
      {
        playlistData.map((e,index)=>{
            return <Playlist_Card data={e} index={index+1}/>
          })
      }
      {/* {
        playlistData.map((e,index)=>{
            return <Playlist_Card data={e} index={index}/>
          })
      }
      {
        playlistData.map((e,index)=>{
            return <Playlist_Card data={e} index={index}/>
          })
      } */}
      
      </div>
    </div>
    
    </>
  )
}

export default PlayList