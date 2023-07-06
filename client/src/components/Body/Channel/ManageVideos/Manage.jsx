import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import { useParams } from 'react-router-dom';
import CustomTabs from './Tabs';


export const CustomizeContext = React.createContext();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Manage() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  
  const {themeToggler} = React.useContext(AppContext)
  
  const {channel_id} = useParams();
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  return (
    <>
      <Button variant="contained" style={{
        marginRight: '.5rem',
        marginTop: '.5rem',
      }} onClick={handleClickOpen} >Manage Video</Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        id='manage-video'
      >
        <DialogTitle sx={{
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }} >Channel content</DialogTitle>
        <DialogContent sx={{
          // padding:'0rem 1.5rem !important',
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }}>

          <CustomTabs />

        </DialogContent>
        <DialogActions sx={{
          border:'none',
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
          color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
        }} >
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}