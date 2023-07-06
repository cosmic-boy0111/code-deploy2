import React,{useContext,useState,useEffect} from 'react'
import '../../style/Navbar/HeadNav.css'
import Button from '@mui/material/Button';
import menu from '../../images/icon/menu.png'
import { IconButton } from '@mui/material';
import AppLogo from '../../images/AppLogo2.png'
import MenuIcon from '@mui/icons-material/Menu';
import ThemeButton from '../ThemeChnageButton'

import { styled } from '@mui/material/styles';
import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';

import VoiceSearch from '../VoiceSearch'

import { AppContext } from '../../App';
import { Theme } from '../Theme';
import Search from './Search';

import { Routes } from '../Shared/Routes';
import Menu from './Menu'

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
const HeadNav = ({handleDrawerOpen, handleDrawerClose, open}) => {

    const {toggleDrawer2,themeToggler} = useContext(AppContext)
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
      setExpanded(open);
    }, [open])
    

    const [searchCheck, setSearchCheck] = useState(false)

    useEffect(() => {
        var check = false;
        Routes.forEach(element => {
            if(window.location.href.includes(element)){
                check = true;
                return;
            }
        });
        if(check){
            setSearchCheck(true);
        }else{
            setSearchCheck(false);
        }
    }, [window.location.href])
    
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
        if(open){
            handleDrawerClose();
        }else{
            handleDrawerOpen();
        }
    };


    return (
        <nav className='head_nav'>
            
            <div className='app_logo'>
            {/* {
                window.screen.width <= '900' ? null :
                <ExpandMore
                    expand={expanded}
                    boxColor='rgb(36, 153, 239)'
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more" 
                >
                    <AlignHorizontalLeftRoundedIcon color='primary'/>
                </ExpandMore>
            } */}
            {
                window.screen.width <= '900' ?  <div>

                    <img src={AppLogo} alt="" srcset="" />  
                    <span style={{
                        fontWeight:'bold'
                    }}>
                        CODE ++
                    </span> 
                </div> 
                : null
            }
                
            </div>
            {/* {
                searchCheck ?  */}
                 {/* : null
            } */}
            
            <div className='theme_button_container'>
                {/* <Search /> */}
            
            {/* <ThemeButton /> */}
            <span className='Open_side_drawer' style={{
                marginRight:'-2rem'
            }}> <ThemeButton  /> </span>
            <span className='Open_side_drawer'> <Menu  /> </span>
            </div>
        </nav>
    )
}

export default HeadNav
