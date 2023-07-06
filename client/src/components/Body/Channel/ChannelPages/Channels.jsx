import React,{useState,useEffect,useContext, createContext} from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';



import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import Graph from './Graph';
import ChannelCard from './Cards/ChannelCard';
import CreateChannel from './SubChannelPages/CreateChannel'
import { ChannelContext } from '../Channel';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export const ChannelCardContext = createContext();
const Channels = () => {

  const {user_id,channel_id} = useParams();
  const {channelList, setChannelList} = useContext(ChannelContext);
  const {themeToggler,rootUser} = useContext(AppContext)

  const [open, setOpen] = React.useState(false); 

  return (
    <ChannelCardContext.Provider value={{
      open,
      setOpen,
      setChannelList
    }}>
      <CreateChannel />
      {
        user_id === rootUser._id ? <div className='create_channel_button'>
          <Button variant="contained"  onClick={()=>setOpen(true)} > <AddRoundedIcon /> {" "} Create channel</Button>
        </div> : null
      }
      
      <Box sx={{ flexGrow: 1 }} style={{
          marginTop:'1rem'
        }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
            {Array.from(Array(channelList.length)).map((_, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
                <Item className='card_container' style={{
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    textAlign:'initial'
                }}>
                  <ChannelCard data={channelList[index]} />
                </Item>
            </Grid> 
            ))}
        </Grid>
        </Box>
    </ChannelCardContext.Provider>
  )
}

export default Channels