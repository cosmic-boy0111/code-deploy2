import React,{useContext} from 'react';
// import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import AppLogo from '../../images/AppLogo2.png'


import { AppContext } from '../../App';
import SideLink from './SideLink';
import user from '../../images/icon/user.png'
import blog from '../../images/icon/blogging.png'
import users from '../../images/icon/about-us.png'
import code from '../../images/icon/code.png'
import webDev from '../../images/icon/layers.png'
import more from '../../images/icon/more.png'
import machine from '../../images/icon/big-data.png'
import appDev from '../../images/icon/developer.png'
import home from '../../images/icon/homepage.png'
import code2 from '../../images/icon/code (2).png'
import channel from '../../images/icon/youtube (1).png'
import Courses from '../../images/icon/graduation.png'


import { Theme } from '../Theme';

import { NavLink } from 'react-router-dom';
import DrawerLink from './DrawerLink';
export default function TemporaryDrawer() {
  
const {toggleDrawer2,state2,themeToggler,rootUser} = useContext(AppContext);




  return (
    <div className='side_drawer' >
      {['left'].map((anchor) => (
        <React.Fragment key={'left'}>
          
          <SwipeableDrawer
            anchor={anchor}
            open={state2[anchor]}
            onClose={toggleDrawer2(anchor, false)}
            onOpen={toggleDrawer2(anchor, true)}
            swipeAreaWidth={0}
          >     
            
            <Box
                // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={toggleDrawer2(anchor, false)}
                onKeyDown={toggleDrawer2(anchor, false)}
                
            
            >
            <div className='side_nav2' style={{
                backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
            }}>
                 {/* <div class='link2'> <img src={AppLogo} alt="" className='link_icon'/> {"Code ++"} </div> */}
                {/* <DrawerLink logo={AppLogo} link={'/'} name={'Code ++'} /> */}
                <DrawerLink logo={home} link={'/'} name={'Home'} />
                <DrawerLink logo={user} link={`/profile/${rootUser._id}`} name={'Profile'} />
                <DrawerLink logo={users} link={'/users'} name={'Users'} />
                <DrawerLink logo={blog} link={'/post'} name={'Blogs'} />
                <DrawerLink logo={code2} link={'/problems'} name={'Problems'} />
                <DrawerLink logo={channel} link={`/channel/${rootUser._id}/${rootUser.activeChannel}`} name={'Channel'} />
                <DrawerLink logo={Courses} link={`/courses`} name={'Courses'} />
                {/* <DrawerLink logo={code} link={'/programming'} name={'Programming'} />
                <DrawerLink logo={webDev} link={'/webdevelopment'} name={'Web Development'} />
                <DrawerLink logo={appDev} link={'/appdevelopment'} name={'App Development'} />
                <DrawerLink logo={machine} link={'/machinelearning'} name={'Machine Learning'} /> */}
                {/* <DrawerLink logo={more} link={'/'} name={''} /> */}

            </div>
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
