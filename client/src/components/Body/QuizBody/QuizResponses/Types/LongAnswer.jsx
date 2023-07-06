import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../../App'
import { Theme } from '../../../../Theme'

const LongAnswer = ({question}) => {

    const {themeToggler} = useContext(AppContext)
   
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
                },
                "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                },
            }}
            style={{
                width: '100%',
                marginTop: '.5rem'
            }}
            multiline={true}
            minRows={1}
            disabled={true}
            id="filled-basic"
            value={question.answer}
            variant="standard"
        />
    )
}

export default LongAnswer