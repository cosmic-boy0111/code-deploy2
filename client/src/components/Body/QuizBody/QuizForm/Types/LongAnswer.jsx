import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'
import { QuizFromContext } from '../QuizForm'

const LongAnswer = ({index}) => {
    const {id} = useParams();

    const { themeToggler } = useContext(AppContext);

    const {userResponse, setUserResponse, setCheckRequired} = useContext(QuizFromContext);

    const [answer, setAnswer] = useState('')
    
    useEffect(() => {
      setAnswer(userResponse[index]?.answer)
    }, [userResponse])
    

    const setQuestionAnswer = (val) => {
        console.log('under red');
        setAnswer(val);
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
            multiline={true}
            minRows={1}
            id="filled-basic"
            label={'Your Answer'}
            value={answer}
            onChange={(e)=>setQuestionAnswer(e.target.value)}
            variant="standard"
        />
    )
}

export default LongAnswer