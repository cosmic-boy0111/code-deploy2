import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import ShortTextRoundedIcon from '@mui/icons-material/ShortTextRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';

import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { Theme } from '../../../Theme';
import { AppContext } from '../../../../App';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus({setType}) {
  const {themeToggler} = React.useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    console.log(event);
    setType(event);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Question Type
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            bgcolor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
            filter: 'drop-shadow(0px 1px 5px rgba(0,0,0,0.15))',
          }
        }}
        style={{
          marginTop: '.5rem',
        }}
      >
        <MenuItem onClick={() => handleClose(0)} disableRipple>
          <ShortTextRoundedIcon fontSize='small' sx={{ mr: 0.5 }} />
          Short Answer
        </MenuItem>
        <MenuItem onClick={() => handleClose(1)} disableRipple>
          <NotesRoundedIcon fontSize='small' sx={{ mr: 0.5 }} />
          Long Answer
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose(2)} disableRipple>
          <RadioButtonCheckedRoundedIcon fontSize='small' sx={{ mr: 0.5 }} />
          Multiple Choice
        </MenuItem>
        <MenuItem onClick={() => handleClose(3)} disableRipple>
          <CheckBoxRoundedIcon fontSize='small' sx={{ mr: 0.5 }} />
          Check Boxes
        </MenuItem>
      </Menu>
    </div>
  );
}