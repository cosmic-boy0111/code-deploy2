import { Divider, IconButton, Switch, TextField, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { QuizResponsesContext } from './QuizResponses';
import { useParams } from 'react-router-dom';

const Header = () => {

    const {id} = useParams();

    const { themeToggler, rootUser } = useContext(AppContext)

    const {totalResponse, currentResponse, setCurrentResponse, view, setView} = useContext(QuizResponsesContext)

    const [number, setNumber] = useState(currentResponse);

    useEffect(() => {
      setNumber(currentResponse);
    }, [currentResponse])
    

    const handleChange = (val) =>{
        setNumber(val);
    }

    useEffect(() => {
        // if (answer !== '') {
            const updateQuestionDelay = setTimeout(() => {
               
                if(number > 0 && number <= totalResponse){
                    console.log(number);
                    setCurrentResponse(parseInt(number));
                }

            }, 1000)

            return () => clearTimeout(updateQuestionDelay)
        // }
    }, [number])


    const changeView = async () => {
        console.log(view);
        
        try {
            
            const res = await fetch('/changeView',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    userId : rootUser._id,
                    quizId : id,
                    view : !view
                })
            })
            
            setView(!view)
            
        } catch (error) {
            
        }

    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            marginBottom:'1rem',
            borderRadius: '5px',
            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            }} >
                <h3>
                    {totalResponse} Response
                </h3>
                <div>
                    Accepting response  <Switch checked={view} onChange={changeView}/>

                </div>
            </div>
            <Divider sx={{ my: 2 }} />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            }} >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    width:'30%'
                }} >
                    <IconButton 
                        size='small' 
                        color='primary' 
                        disabled={currentResponse <= 1} 
                        onClick={()=>setCurrentResponse(currentResponse - 1)}
                    >
                        <KeyboardArrowLeftRoundedIcon />
                    </IconButton>
                    <div style={{
                        // width: '30%',
                        margin: '0 .7rem',
                        display: 'flex',
                    }}>

                        <TextField
                            inputProps={{
                                style: {
                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                },
                                min: 1, 
                                max: totalResponse
                            }}
                            sx={{
                                "& label": {
                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    "& .MuiInputBase-input.MuiInput-input.Mui-disabled": {
                                        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                    }
                                }
                            }}
                            // InputProps={{ inputProps: { min: 1, max: totalResponse } }}
                            id="standard-search"
                            type="number"
                            value={number}
                            onChange={(e)=> handleChange(e.target.value)}
                            variant="standard"
                            size='small'
                        />
                        <div style={{ marginLeft: '.5rem', display: 'flex' }} >
                            <span style={{ marginRight: '.5rem' }} >of</span>
                            <span>{totalResponse}</span>
                        </div>
                    </div>
                    <IconButton 
                        size='small' 
                        color='primary'
                        disabled={currentResponse === totalResponse} 
                        onClick={()=>setCurrentResponse(currentResponse + 1)}
                    >
                        <KeyboardArrowRightRoundedIcon />
                    </IconButton>
                </div>
                <div>
                    {/* Accepting response  <Switch defaultChecked /> */}
                    <Tooltip title='Download Responses' >

                        <IconButton color='primary' style={{ marginRight:'1rem' }}>
                            <DownloadRoundedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Response' >

                        <IconButton color='secondary' >
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default Header