import React,{useContext, useState,useEffect} from 'react'
import '../../style/Navbar/SideNav.css'
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
import { Theme } from '../Theme';
import { AppContext } from '../../App';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Divider, IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';
import Applogo from '../../images/AppLogo2.png'
import Courses from '../../images/icon/graduation.png'


// icons
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import VideoStableRoundedIcon from '@mui/icons-material/VideoStableRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} color='primary' />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
const SideNav = ({handleDrawerOpen, open}) => {

    
    

    const {rootUser,themeToggler} = useContext(AppContext)
    const [selected, setSelected] = useState(0)

  

     
    const handleExpandClick = () => {
      
      handleDrawerOpen();
  };

    return (
       
            
             <>
             
             {/* <SideLink icon={Applogo} link={'/'} name={'CODE ++'}  open={open} />  */}

             {
              open ? '' :
             <>
             <ListItemButton style={{
              // borderBottom : `2px solid ${themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground}`
        }}>
       
            <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    
                  }}
                >
                  <ExpandMore
                      expand={open}
                      boxColor='rgb(36, 153, 239)'
                      onClick={handleExpandClick}
                      aria-expanded={open}
                      aria-label="show more" 
                  >
                      <AlignHorizontalLeftRoundedIcon color='primary'/>
                  </ExpandMore>
                </ListItemIcon>
          </ListItemButton>
                <Divider style={{
                  margin:'0 .5rem',
                  color:themeToggler?Theme.Dark.fadeColor : Theme.Light.fadeColor
                }}/>

          </>
                }

             
             <SideLink icon={<GridViewRoundedIcon />} link={'/'} name={'Dashboard'}  open={open} /> 
            <SideLink icon={<PersonOutlineRoundedIcon />} link={`/profile/${rootUser._id}`} name={'Profile'}  open={open} />
            <SideLink icon={<PeopleOutlineRoundedIcon />} link={'/users'} name={'Users'} open={open} />
            <SideLink icon={<VideoStableRoundedIcon />} link={'/post'} name={'Post'} open={open} />
            <SideLink icon={<CodeRoundedIcon />} link={'/problems'} name={'Problems'} open={open} />
            <SideLink icon={<SlideshowRoundedIcon />} link={`/channel/${rootUser._id}/${rootUser.activeChannel}`} name={'Channel'} open={open} />
            <SideLink icon={<BookRoundedIcon />} link={`/courses`} name={'Courses'} open={open} />
            <SideLink icon={<QuizRoundedIcon />} link={`/quiz`} name={'Quiz'} open={open} />
            
             </>
           
    )
}

export default SideNav

