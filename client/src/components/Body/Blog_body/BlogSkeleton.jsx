import React,{useContext} from 'react'

import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const BlogSkeleton = () => {


  const { themeToggler } = useContext(AppContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md:12}} style={{ paddingTop:'0' }}>
      <Grid item xs={4} sm={4} md={4}>
        
      </Grid>
      {Array.from(Array(5)).map((_, index) => (
        <Grid item xs={4} sm={4} md={4}>
        <Item className='card_container' style={{
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
            border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
            textAlign:'left',
            padding:'0',
            borderRadius:'5px',
        }}>
          <Stack spacing={1}>

            <Skeleton variant="rounded" height={200} style={{
              borderRadius:'5px 5px 0 0',
              objectFit:'cover'
            }}/>
            <Skeleton variant="text" width={100} style={{
              margin:'.2rem .5rem',
              fontSize:'1rem'
            }}/>
            <div style={{
              display:'flex',
              margin:'1rem .5rem',

            }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} style={{
              marginLeft:'1rem'
            }} />
            </div>

          </Stack>
        </Item>
    </Grid>
      ))}
          
        </Grid>
    </Box>
  )
}

export default BlogSkeleton