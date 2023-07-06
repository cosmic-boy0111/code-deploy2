
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import { CompilerContext } from './Compiler';
import { Button } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';


const ITEM_HEIGHT = 48;

export default function SelectTheme() {


  const {themeToggler} = React.useContext(AppContext)
  const {theme,setTheme} = React.useContext(CompilerContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    setTheme(typeof option === "object" ? theme : option);
    setAnchorEl(null);
  };

  
const options = [
  'light',
  'vs-dark'
];

  return (
    <div>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        size='small'
      >
         {theme} <KeyboardArrowDownRoundedIcon />
      </Button>
     
      {/* <Button
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant='outlined'
        size='small'
      >
        {selectLang} {" "}<KeyboardArrowDownRoundedIcon />
      </Button> */}
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            color:themeToggler? Theme.Dark.Color : Theme.Light.Color
          },
        }}
      >
        {options.map((option,index) => (
          <MenuItem selected={option === theme} onClick={()=>handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

