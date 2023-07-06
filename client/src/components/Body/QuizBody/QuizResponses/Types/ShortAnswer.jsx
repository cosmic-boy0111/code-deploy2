import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'


import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ShortAnswer = ({question}) => {


    const { themeToggler } = useContext(AppContext);

   


    return (
        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid item xs={6} md={7}>
                <Item style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    textAlign: 'left',
                    padding: '0',
                    margin:'0'
                }} >


                    <TextField
                        inputProps={{
                            style: {
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            }
                        }}
                        sx={{
                            "& label": {
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                }
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            },
                        }}
                        style={{
                            width: '100%',
                            marginTop: '.5rem'
                        }}
                        disabled={true}
                        id="filled-basic"
                        value={question.answer}
                        variant="standard"
                    />
                </Item>

            </Grid>
        </Grid>
    )
}

export default ShortAnswer