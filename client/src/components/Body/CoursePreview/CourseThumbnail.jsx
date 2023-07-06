import { CardMedia } from '@mui/material'
import React from 'react'


import tempImage from '../../../images/assets/undraw_images_re_0kll.svg'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const CourseThumbnail = ({thumbnail}) => {
  return (
    <Grid item xs={12} sm={12} md={6} >
            <Item style={{
              backgroundColor: 'transparent',
              borderRadius: '0',
              padding: '0',
              margin: '0',
              boxShadow: 'none',
              textAlign: 'left',
              height: '100%',
            }} >
              <CardMedia
                component={'img'}
                src={thumbnail === '' ? tempImage : thumbnail}
                controls
                height={'100%'}
                style={{

                  objectFit: 'fill',
                  borderRadius: '10px'
                }}
              />
            </Item>
          </Grid>
  )
}

export default CourseThumbnail
