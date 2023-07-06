import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, Tooltip } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';

export default function BasicMenu({editingComment, deleteComment}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {themeToggler} = React.useContext(AppContext)

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
       
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
            <MoreVertIcon fontSize='small' />
          </IconButton>
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
        <MenuItem onClick={editingComment} style={{
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor

        }}> <EditRoundedIcon fontSize='small' sx={{marginRight:'.5rem'}} /> Edit</MenuItem>
        <MenuItem onClick={deleteComment} style={{
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor

        }}> <DeleteRoundedIcon fontSize='small' sx={{marginRight:'.5rem'}} /> Delete</MenuItem>
        {/* <MenuItem onClick={handleClose} style={{
            color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor

        }}>Logout</MenuItem> */}
      </Menu>

    </div>
  );
}