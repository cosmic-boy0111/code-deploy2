import React, { useContext } from 'react'

import { AppContext } from '../../../../../App';
import { Theme } from '../../../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import CardSkeleton from './CardSkeleton'
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const FollowerSkeleton = () => {

    const {themeToggler} = useContext(AppContext)

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 4 }}>
            {Array.from(Array(4)).map((_, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
                <Item className='card_container' style={{
                    backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                    boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                    border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                    textAlign:'initial'
                }}>
                    <CardSkeleton />
                </Item>
            </Grid> 
            ))}
        </Grid>
        </Box>
    </>
  )
}

export default FollowerSkeleton