import React,{useState,useEffect} from 'react'
import '../../../style/Body/Users.css'
import { Theme } from '../../Theme'
import { AppContext } from '../../../App'
import { useContext } from 'react'
import Grid from '@mui/material/Grid';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import { Box , Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { useParams } from 'react-router-dom'

import Line from './Bar'
import { webRoutes } from '../../Shared/Routes'
import { Avatar } from "@mui/material";



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HeaderGrid = () => {

    const {lang} = useParams();
  const {themeToggler} = useContext(AppContext);

    const [selectedLang, setSelectedLanguage] = useState({})

    useEffect(() => {
        var found = webRoutes.find(function(element) {
            return element.lang === lang;
        });
        setSelectedLanguage(found)
    }, [])
    

  return (
    <div className='header_grid'>
      <div className='total_user' style={{
        backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
      }}>
        
        <div
              className="logo_img"
              style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.boxColor
                  : Theme.Light.boxColor,
                
              }}
            >
              <Avatar
                aria-label="recipe"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor:'transparent',
                  borderRadius:'0px'
                }}
              >
                <img
                    src={selectedLang.icon}
                    alt=""
                    style={{
                      width: "90%",
                      height: "90%",
                    }}
                  />
              </Avatar>
              
            </div>
              <h3>{selectedLang.title}</h3>
      </div>
      <div className='user_join' style={{
        backgroundColor:themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
        border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
      }}>
        <Line title={selectedLang.title + " Development"}/>
      </div>
    </div>
  )
}

export default HeaderGrid