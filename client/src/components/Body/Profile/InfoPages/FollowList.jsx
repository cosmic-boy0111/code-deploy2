
import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './Card';
// import Graph from './Graph';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CardRoutes = ({ data }) => {


    const { themeToggler } = useContext(AppContext)


    return (
        <>
            
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ paddingTop: '0' }}>
                    {

                        data.map((e, index) => {
                            return <Grid item xs={4} sm={4} md={4}>
                                <Item className='card_container' style={{
                                    backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                    boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                                    border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                                    textAlign: 'initial'
                                }}>
                                    <Card user={data[index]} />
                                </Item>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>
        </>
    );
};

export default CardRoutes;
