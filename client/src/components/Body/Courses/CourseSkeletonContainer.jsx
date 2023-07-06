import React from 'react'



import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CourseCard from './CourseCard';
import { CourseContext } from './Courses';
import { Skeleton } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CourseSkeletonContainer = () => {
  return (
    <>
    <div style={{
        marginBottom:'2rem'
    }} >
        <Skeleton variant="rounded" width={'250px'} height={'40px'} />
    </div>
    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 16 }} style={{ paddingTop: '0' }}>

        {
            [1,2,3,4,5,6,7,8].map(() => {
            return <Grid item xs={4} sm={4} md={4}>
              <Item className='card_container' style={{
                backgroundColor: 'none',
                // boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                boxShadow:'none',
                border: 'none',
                textAlign: 'left',
                padding: '0',
                borderRadius: '5px',
              }}>
                 <Skeleton variant="rounded" width={'100%'} height={'300px'} />
              </Item>
            </Grid>


          })

        }
      </Grid>
              </>
  )
}

export default CourseSkeletonContainer
