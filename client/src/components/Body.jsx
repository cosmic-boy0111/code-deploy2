import React, { useContext, useEffect } from 'react';
import {useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SideNav from './Navbar/SideNav'
import HeadNav from './Navbar/HeadNav';



import Blog from './Body/Blog_body/Blog';
import Profile from './Body/Profile/Profile';
import Programming from './Body/Programming/Programming';
import DashBoard from './DashBoard/DashBoard';
import ProblemPage from './Body/Problems/ProblemPage';
import TemporaryDrawer from './Navbar/Drawer';
import Compiler from './Body/Compiler/Compiler'
import WebDevelopment from './Body/Web_Development/WebDevelopment';
import AppDevelopment from './Body/App_Development/AppDevelopment';
import MachineLearning from './Body/Machine_Learning/MachineLearning';

import UsersPage from './Body/Users/UsersPage';
import SharedPost from './Body/Blog_body/SharedPost';


import AppLogo from '../images/AppLogo2.png'


import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'

import { AppContext } from '../App';
import { Theme } from './Theme';
import Waves from './Waves';

import Languages from './Body/Programming/Languages';
import WebLang from './Body/Web_Development/Languages'
import AppLang from './Body/App_Development/Languages'
import MlLang from './Body/Machine_Learning/Languages'
import Channel from './Body/Channel/Channel';
import VideoPage from './Body/Video/VideoPage';
import SearchResult from './Body/SearchResult/SearchResult';
import Courses from './Body/Courses/Courses';



import Switch from '@mui/material/Switch';
import ThemeButton from './ThemeChnageButton'
import { Tooltip } from '@mui/material';
import BottomNav from './Navbar/BottomNav';

import { useScrollDirection } from 'react-use-scroll-direction'




import { IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';
import BlogViewer from './Body/Blog_body/Blog_Viewer/BlogViewer';
import Quiz from './Body/QuizBody/Quiz/Quiz';
import PrepareQuiz from './Body/QuizBody/PrepareQuiz/PrepareQuiz';
import QuizForm from './Body/QuizBody/QuizForm/QuizForm';
import QuizResponses from './Body/QuizBody/QuizResponses/QuizResponses';
import CoursePreview from './Body/CoursePreview/CoursePreview';
// import PrepareQuiz from './Body/Quiz/PrepareQuiz';

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


const drawerWidth = 200
const drawerHight = '100vh';





const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    padding:'.5rem',
    color: AppContext.themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { setRootUser, themeToggler } = useContext(AppContext);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };




  useEffect(() => {
    var myDiv = document.getElementsByTagName("body")[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();
  const getData = async () => {
    try {
      const res2 = await fetch('/about', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const Data = await res2.json();
      setRootUser(Data)
      console.log(Data);
    } catch (error) {
      console.log('data not found');
      navigate('/login')
    }
  }

  useEffect(() => {
    getData();
  }, []);



  const { 
  } = useScrollDirection()



  return (
    <>


      <Box sx={{ display: 'flex', color: themeToggler ? Theme.Dark.Color : Theme.Light.Color, }} style={{
        // backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
        color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        // height:'100%',
        // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow: Theme.Dark.BoxShadow,
        display:'flex',


      }}>

        <CssBaseline />

        <Drawer
          
          // onMouseOver={()=>setOpen(true)}
          // onMouseLeave={()=>setOpen(false)}
          variant="permanent" open={open} className='drawer_nav' style={{
            // backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            // color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            // height:'100%',
            // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            // boxShadow: Theme.Dark.BoxShadow,

          }}>
          {/* <img src={AppLogo} alt="" srcset="" /> */}
          <List className='list_items' style={{
            backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            // color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
            // backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            height: '100vh',
            // padding:'.5rem'
            // backgroundClip:'red',
            // backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
            // backgroundColor:'transparent'
          }}>
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
                  {
                     


                  <img src={AppLogo} alt="" className='link_icon'/>  
                  }
                </ListItemIcon>
                <div style={{
                  display:'flex',
                  justifyContent:'space-between',
                  width:'100%'
                }}>

                <ListItemText primary={'AI-SDA'} sx={{ opacity: open ? 1 : 0 }} style={{
                  color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                }}/>
                {
                  open &&
                  <ExpandMore
                  expand={open}
                  boxColor='rgb(36, 153, 239)'
                  onClick={()=>handleDrawerClose()}
                  aria-expanded={open}
                  aria-label="show more" 
                  >
                      <AlignHorizontalLeftRoundedIcon color='primary'/>
                  </ExpandMore>
                  }
                </div>
          
          </ListItemButton>
                <Divider style={{
                  margin:'0 .5rem',
                  color:themeToggler?Theme.Dark.fadeColor : Theme.Light.fadeColor
                }}/>
{/*                 
          <Divider style={{
              marginLeft:'.5rem',
              // color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.FadeBackground,
            
            }}/> */}

            <SideNav handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} />
            {/* <Divider style={{
              marginLeft:'.5rem'
            }}/> */}
            <Divider style={{
                  margin:'0 .5rem',
                  color:themeToggler?Theme.Dark.fadeColor : Theme.Light.fadeColor
                }}/>

            <ListItemButton style={{
              // borderTop : `2px solid ${themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor}`
        }}>

            <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? -2 : 'auto',
                    justifyContent: 'center',
                    
                  }}
                >
                  {
                    <Tooltip title={'Theme'} placement="right">
                      <ThemeButton />
                    </Tooltip>
                  }
                </ListItemIcon>
                <ListItemText primary={'Theme'} sx={{ opacity: open ? 1 : 0 }} style={{
                  color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                }}/>
          
          </ListItemButton>
            
          </List>
        </Drawer>
        <TemporaryDrawer />

        <div className='Body_container'  style={{
          backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
          color: themeToggler ? Theme.Dark.Color : Theme.Light.Color
        }}>
          <HeadNav handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} />
          
          <div className='Actual_body' >
            <Routes>
              <Route exact path='/' element={<DashBoard />} />
              
              <Route exact path='/post' element={<Blog />} />
              <Route exact path='/post/:id' element={<BlogViewer />} />

              <Route exact path='/profile/:id' element={<Profile />} />
              <Route exact path='/users' element={<UsersPage />} />

              <Route exact path='/compiler/:title/:id' element={<Compiler />} />
              <Route exact path='/problems' element={<ProblemPage />} />

              <Route exact path='/channel/:user_id/:channel_id' element={<Channel />} />
              <Route exact path='/video/:id' element={<VideoPage />} />

              <Route exact path='/courses' element={<Courses />} />
              <Route exact path='/course/:id' element={<CoursePreview />} />

              <Route exact path='/programming/:lang' element={<Languages />} />
              <Route path='/webdevelopment/:lang' element={<WebLang />} />
              <Route path='/appdevelopment/:lang' element={<AppLang />} />
              <Route path='/machinelearning/:lang' element={<MlLang />} />

              <Route path='/yoursearch/:tag' element={<SearchResult />} />

              <Route path='/quiz' element={<Quiz />} />
              <Route path='/quiz/prepare/:id' element={<PrepareQuiz />} />
              <Route path='/quiz/solve/:id' element={<QuizForm />} />
              <Route path='/quiz/responses/:id' element={<QuizResponses />} />
            </Routes>
          </div>
          <BottomNav />
        </div>

      </Box>
    </>
  );
}
