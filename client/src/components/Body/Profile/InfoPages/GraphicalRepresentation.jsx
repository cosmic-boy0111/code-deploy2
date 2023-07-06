import React, { useContext, useEffect, useState } from 'react'
import Bar from '../Bar'
import Polar from '../Polar'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import Heatmap from '../Heatmap';
import { Box, Grid } from '@mui/material';
import Line from '../Line';
import { useParams } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const GraphicalRepresentation = () => {

  const { themeToggler } = useContext(AppContext)

  const {id} = useParams();

  const [userGraph, setUserGraph] = useState({})

  const getUserGraph =  async () => {
    try {
      const res = await fetch(`/getUserGraphData/${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setUserGraph(data);
    } catch (error) {
      
    }    
  }

  useEffect(() => {
    
    getUserGraph();

  }, [id])
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{
        marginBottom:'2rem'
      }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={4} md={4} >
            <Item style={{
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                
              }}>
                <p style={{color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor}} >Blogs</p>
                <Line data={userGraph.blogs} color={'#64b5f6'}/>
            </Item>
          </Grid>
          <Grid item xs={12} sm={4} md={4} >
            <Item
              style={{
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                
              }}>
                <p style={{color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor}} >Problems</p>
                <Line data={userGraph.problems} color={'#81c784'}/>

            </Item>
          </Grid>
          <Grid item xs={12} sm={4} md={4} >
            <Item
              style={{
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                
              }}>
                <p style={{color : themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor}} >Courses</p>
                <Line data={userGraph.courses} color={'#ba68c8'}/>

            </Item>
          </Grid>
        </Grid>
      </Box>
      <Item className='card_container' style={{
        backgroundColor: 'transparent',
        boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
      }}>

        {/* <Heatmap /> */}
      </Item>

    </>
  )
}

export default GraphicalRepresentation