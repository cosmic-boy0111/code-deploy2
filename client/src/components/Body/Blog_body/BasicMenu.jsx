import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

export default function BasicMenu({deleteBlog,editBlog}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteB = () =>{
    if(!window.confirm('Want to delete ? ')){
      setAnchorEl(null);
      return
    }
    deleteBlog();
    setAnchorEl(null);
  }

  const editB = () =>{
    editBlog();
    setAnchorEl(null);
  }

  const {themeToggler} = React.useContext(AppContext)

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Accounts">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            style={{
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            }}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }} src={img}/> */}
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
            elevation: 0,
            sx: {
              borderRadius:'5px',
              bgcolor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={editB} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor

        }}>Edit</MenuItem>
        <MenuItem onClick={deleteB} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor

        }}>Delete</MenuItem>
        {/* <MenuItem onClick={handleClose} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor

        }}>Logout</MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
