import React,{useContext,useEffect} from 'react'
import logo from '../../../images/icon/big-data.png'
import ml from '../../../images/assets/ai-technology-brain-background-digital-transformation-concept (2).jpg'
import TechHeader from '../../Shared/TechHeader'


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import Card from '../../Shared/LogoCard';
import { mlRoutes } from '../../Shared/Routes';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const AppDevelopment = () => {
  
  useEffect(() => {
    var myDiv = document.getElementsByClassName('Body_container')[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);
  const {themeToggler  } = useContext(AppContext)

  return (
    <>
        <TechHeader logo={logo} bg={ml} text={"Machine Learning"}/>
        {/* <div className='code_container'> */}
    
        <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 8, sm: 8, md: 16 }}>
            {Array.from(Array(mlRoutes.length)).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
                <Item className='card_container' style={{
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                }}>
                  <Card data={mlRoutes[index]} />
                </Item>
            </Grid>
            ))}
        </Grid>
        </Box>

      {/* </div> */}
    </>
  )
}

export default AppDevelopment