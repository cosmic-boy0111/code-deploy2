import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import CourseCard from './CoursesCard';


import { Theme } from '../../../Theme'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Courses = () => {

  const {rootUser, themeToggler}  = useContext(AppContext);
  const {id} = useParams();


  const [courses, setCourses] = useState([])

  const getData = async () => {


    try {
      
      const res = await fetch(`/get_user_courses/${id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])
  

  return (
    <div>
      
      <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ paddingTop: '0' }}>
              {

                courses.map((e) => {
                  return <Grid item xs={4} sm={4} md={3}>
                    <Item className='card_container' style={{
                      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      textAlign: 'left',
                      padding: '0',
                      borderRadius: '10px',
                      color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                    }}>
                      <CourseCard data={e}/>
                    </Item>
                  </Grid>
                })
              }
            </Grid>
          </Box>
    </div>
  )
}

export default Courses