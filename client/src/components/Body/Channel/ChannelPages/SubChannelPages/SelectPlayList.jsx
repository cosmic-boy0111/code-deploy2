import React,{useContext,useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';


import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';

import { VideoChannelContext } from '../Videos';
import { padding } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      
    },
  },
};



export default function MultipleSelectCheckmarks({video,setVideo}) {


  const { themeToggler } = useContext(AppContext);

  const [value, setValue] = useState([])

  const {playLists} = useContext(VideoChannelContext)


  const handleChange = (event) => {

    if(event.target.value === undefined){
      return;
    }

    const {
      target: { value },
    } = event;
    console.log(event);
    var name = event.target.value;

    
    
      if(name === ''){
        setVideo({...video,playlist_id : ''})
        setValue([])
        return;
      }

      console.log(playLists);
    playLists.forEach(element => {
      if(element._id === name){
        setVideo({...video,playlist_id : element._id})
        console.log(video);
        setValue([element.name])
        return;
      }
    });
    
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <InputLabel id="demo-multiple-checkbox-label">tags</InputLabel> */}
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple={false}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="tags" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{
            backgroundColor : themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground,
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
          }}
        >
          {/* <MenuItem value={''} style={{
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}> */}
              {/* <Checkbox checked={value.indexOf('') > -1} />
              <ListItemText primary={'Playlist Free'} /> */}
            {/* </MenuItem> */}
          {playLists.map((playlist) => (
            <MenuItem key={playlist.name} value={playlist._id} style={{
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          }}>
              {/* <Checkbox checked={value.indexOf(playlist._id) > -1} /> */}
              <ListItemText primary={playlist.name} style={{
                padding:'.4rem'
              }}/>
            </MenuItem>
          ))}
         
        </Select>
      </FormControl>
    </>
  );
}
