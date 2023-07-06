import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import QuizCard from './QuizCard';
import { QuizContext } from './Quiz';
// import Graph from './Graph';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const QuizBody = () => {


    const { themeToggler } = useContext(AppContext)

    const {quizList} = useContext(QuizContext);


    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}  >
                    {

                        quizList.map((e, index) => {
                            return <Grid item xs={12} sm={12} md={4} >
                                <Item className='card_container' style={{
                                    backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                    boxShadow: 'none',
                                    border: 'none',
                                    textAlign: 'initial',
                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                }}>
                                    <QuizCard data={e} />
                                </Item>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}

export default QuizBody