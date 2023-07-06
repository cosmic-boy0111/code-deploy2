import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'


import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { QuizFromContext } from '../QuizForm';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ShortAnswer = ({index}) => {

    const {id} = useParams();

    const { themeToggler } = useContext(AppContext);

    const {userResponse, setUserResponse, setCheckRequired} = useContext(QuizFromContext);

    const [answer, setAnswer] = useState('')
    
    useEffect(() => {
      setAnswer(userResponse[index]?.answer)
    }, [userResponse])
    

    const setQuestionAnswer = (val) => {
        setAnswer(val);
        console.log('under red',userResponse);
        if(userResponse[index].isRequired){
            setCheckRequired(false);
        }
    }

    useEffect(() => {
        // if (answer !== '') {
            const updateQuestionDelay = setTimeout(() => {
                var ele = {
                    ...userResponse[index],
                    answer : answer
                }

                userResponse[index] = ele;
                localStorage.setItem(id, JSON.stringify(userResponse));
                setUserResponse(userResponse);

            }, 3000)

            return () => clearTimeout(updateQuestionDelay)
        // }
    }, [answer])



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
                            }
                        }}
                        style={{
                            width: '100%',
                            marginTop: '.5rem'
                        }}
                        id="filled-basic"
                        label={'Your Answer'}
                        value={answer}
                        onChange={(e)=>setQuestionAnswer(e.target.value)}
                        variant="standard"
                    />
                </Item>

            </Grid>
        </Grid>
    )
}

export default ShortAnswer