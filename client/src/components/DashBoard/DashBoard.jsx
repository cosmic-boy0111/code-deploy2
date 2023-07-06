import React, { createContext, useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { AppContext } from '../../App';
import { Theme } from '../Theme';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { style } from '@mui/system';
import Bar from './Bar'
import Polar2 from './Polar';
import CardRoutes from './CardRoutes';
import { PolarArea } from 'react-chartjs-2'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const DashboardContext = createContext();

const DashBoard = () => {
  const { themeToggler, rootUser } = useContext(AppContext)

  useEffect(() => {
    window.scroll(0, 0)
  }, []);

  const [videoRecommendate, setVideoRecommendate] = useState([])
  const [courseRecommendate, setCourseRecommendate] = useState([])

  const [graphData, setGraphData] = useState({});

  const getData =  async () => {
    try {
      const res = await fetch('/getWebGraphData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setGraphData(data)

    } catch (error) {
      
    }
  }

  useEffect(() => {
    
    getData();

  }, [])
  



  return <DashboardContext.Provider value={{
    videoRecommendate,
    setVideoRecommendate,
    courseRecommendate,
    setCourseRecommendate,
    graphData
  }}>
    <div className='info_holder body_margin' >
      <Box sx={{ flexGrow: 1 }}>


        <CardRoutes />

      </Box>
      {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }} gridRow={{ xs: 0, sm: 0, md: 0}}>
            
            <Grid item xs={6}>
              <Item className='card_container' style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
                }}>
                    <Polar2 />
              
              </Item>
              <Item className='card_container' style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      marginTop:'2rem'
                }}>
                    <Bar />
              </Item>
            </Grid>
          </Grid>
        </Box> */}
    </div>
  </DashboardContext.Provider>;
};

export default DashBoard;
