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
import ThemeButton from '../ThemeChnageButton'


import { AppContext } from '../../App';
import { Theme } from '../Theme';
import { NavLink } from 'react-router-dom';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {themeToggler,rootUser} = React.useContext(AppContext);
  const [img, setImg] = React.useState('')

  const getData = async() =>{
    const res = await fetch(`/getImg/${rootUser._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json();
      setImg(data.img);
  }

  React.useEffect(() => {
    getData();
  }, [rootUser])
  

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
          >
            <Avatar sx={{ width: 32, height: 32 }} src={img}/>
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
        <NavLink to={`/profile/${rootUser._id}`} style={{
            textDecoration:'none',
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
        }}>

        <MenuItem>
            <ListItemIcon>

          <PersonOutlineRoundedIcon color='primary'/> 
          </ListItemIcon>
          Profile
        </MenuItem>
        </NavLink>
        <NavLink to={`/channel/${rootUser._id}/${rootUser.activeChannel}`} style={{
            textDecoration:'none',
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
        }}>

        <MenuItem>
            <ListItemIcon>

          <SlideshowRoundedIcon color='primary'/> 
          </ListItemIcon>
          Channel
        </MenuItem>
        </NavLink>
        
        {/* <Divider />
        
      
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small"  color='primary'/>
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
