import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { IconButton } from '@mui/material';
import ClearRounded from '@mui/icons-material/ClearRounded';
import GamepadIcon from '@mui/icons-material/Gamepad';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublishIcon from '@mui/icons-material/Publish';
import Input from './Actions/Input';
import Run from './Actions/Run';
import Submit from './Actions/Submit';
import { Theme } from '../../Theme';
import { AppContext } from '../../../App';
import { CompilerContext } from './Compiler';

const actions = [
  { icon: <GamepadIcon />, name: 'Console' },
  { icon: <PlayArrowIcon />, name: 'Run' },
  { icon: <PublishIcon />, name: 'Submit' },
];


export default function BasicSpeedDial() {
  const [height, setHeight] = React.useState(0)

  const {themeToggler} = React.useContext(AppContext)
  const {setRun,run,setInput,action, setAction, upload, setUpload,setChecker} = React.useContext(CompilerContext)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isUpload, setIsUpload] = React.useState(true)

  const makeAction = (action) =>{
    handleClose();
    setAction(action)
    if(action === 'Run'){
      setRun(!run);
    }
    if(action === 'Submit'){
      // setTimeout(() => {
        
        setUpload(!upload);
        setIsUpload(false);
      // }, 500);
      setChecker([]);
      localStorage.removeItem('cases')
    }
    setHeight(400);
  }
  

  return (
    <Box sx={{ height: height, transform: 'translateZ(0px)', flexGrow: 1, margin:'.2rem 0' }} >

      <div style={{
        display : height ? 'block' : 'none',
        position:'absolute',
        top:'.3rem',
        right:'.5rem',
      }}>
        <IconButton onClick={()=>{
          setHeight(0)
          setAction('')
        }} color='primary' > <ClearRounded /> </IconButton>
      </div>
      <div className='Action_Container' style={{
        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
        display: height ? 'block' : 'none'
      }}>
      {
        action === 'Console' ? <Input />  : (
          action === 'Run' ? <Run /> : (
            action === 'Submit' ? <Submit setIsUpload={setIsUpload}/> : ``
          )
        )
      }
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        // direction={'left'}
        onClose={handleClose}
        onOpen={ isUpload ? handleOpen : ``}
        open={open}
        
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={()=>makeAction(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
