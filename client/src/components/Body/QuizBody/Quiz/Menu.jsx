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

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from './Quiz';

export default function AccountMenu({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {themeToggler} = React.useContext(AppContext)

  const { DeleteQuiz } = React.useContext(QuizContext)

  const navigate = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Edit = () => {
    navigate(`/quiz/prepare/${id}`)
  }

  const Delete = () => {
    handleClose();
    DeleteQuiz(id);
  }


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="More">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            style={{
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }}
          >
            <MoreVertRoundedIcon fontSize='small' />
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
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            bgcolor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
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
              transform: 'translateY(-50%) rotate(45deg)',
              bgcolor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
              color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=> {
          Edit()
          handleClose()
          }}>
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" color='primary' />
          </ListItemIcon>
          Edit
        </MenuItem>

        <MenuItem onClick={Delete}>
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" color='secondary' />
          </ListItemIcon>
          Delete
        </MenuItem>
        
      </Menu>
    </React.Fragment>
  );
}