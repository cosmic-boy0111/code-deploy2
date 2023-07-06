import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import { IconButton, Tooltip } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PrepareQuizContext } from './PrepareQuiz';
import { useParams } from 'react-router-dom';


const Header = ({headerFields, setHeaderFields}) => {

    const { themeToggler, rootUser } = useContext(AppContext)

    const { Add, updateHeader } = useContext(PrepareQuizContext);

    useEffect(() => {
        const updateQuestionDelay = setTimeout(() => {
            updateHeader();
        }, 3000)

        return () => clearTimeout(updateQuestionDelay)
    }, [headerFields, updateHeader])

    const handleChange = (e) => {
        var value = e.target.value
        var name = e.target.name
        setHeaderFields({
            ...headerFields,
            [name] : value
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            borderRadius: '5px',
            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
        }}>

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
                    marginBottom:'1rem'
                }}
                id="filled-basic"
                name='title'
                value={headerFields.title}
                label={'Title'}
                variant="standard"
                onChange={handleChange}
            />

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
                    width: '100%'
                }}
                multiline={true}
                minRows={1}
                id="filled-basic"
                name='description'
                value={headerFields.description}
                label={'Description'}
                variant="standard"
                onChange={handleChange}
            />
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '1rem'
                }} >
                    <Tooltip title="Add After">
                        <IconButton color="primary" aria-label="save" onClick={() => Add(0)}>
                            <AddRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Header