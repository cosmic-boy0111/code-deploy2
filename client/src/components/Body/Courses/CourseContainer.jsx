import React,{useContext} from 'react'

import { AppContext } from '../../../App'
import { Theme } from '../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CourseCard from './CourseCard';
import { CourseContext } from './Courses';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CourseContainer = () => {
  const {themeToggler} = useContext(AppContext);
  const {filterCourses} = useContext(CourseContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 16 }} style={{ paddingTop: '0' }}>

        {
          filterCourses.map((course) => {
            return <Grid item xs={4} sm={4} md={4}>
              <Item className='card_container' style={{
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                // boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                boxShadow:'none',
                border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                border:'none',
                textAlign: 'left',
                padding: '0',
                borderRadius: '5px',
                cursor:'pointer',
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
              }}>
                  <CourseCard course={course}/>
              </Item>
            </Grid>


          })

        }
      </Grid>
    </Box>
  )
}

export default CourseContainer