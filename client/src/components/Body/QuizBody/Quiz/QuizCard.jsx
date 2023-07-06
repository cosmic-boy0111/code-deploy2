import React from 'react'

import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import IconButton from '@mui/material/IconButton';
import AccountMenu from './Menu';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Tooltip } from '@mui/material';
import { RWebShare } from 'react-web-share';
import { useNavigate, useParams } from 'react-router-dom';

const QuizCard = ({ data }) => {

    const navigate = useNavigate();


    return (
        <div>
            
            <div onClick={()=>{
                navigate(`/quiz/prepare/${data._id}`)
            }} 
            style={{
                cursor:'pointer'
            }}
            >

            <h4 style={{
                width: '80%',
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: 'nowrap',
            }} >
                {data.title === '' ? 'Untitled Form' : data.title.substring(0,30) + '...'}
            </h4>
            <p style={{
                width: '80%',
                overflow: "hidden",
                textOverflow:'ellipsis',
                // whiteSpace: 'nowrap',
            }}>
                 {data.description === '' ? 'Description not available' : data.description.substring(0,30) + '...'}
            </p>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'end'
            }} >
                <div style={{
                    display: 'flex',
                }}>
                    <RWebShare
                        data={{
                            text: "check out this amazing quiz",
                            url: `${window.location.origin}/quiz/solve/${data._id}`,
                            title: "Code++ Quiz",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >

                        <Tooltip title="Send">


                            <IconButton>
                                <SendRoundedIcon fontSize='small' color='primary' />
                            </IconButton>
                        </Tooltip>
                    </RWebShare>
                    <AccountMenu id={data._id} />
                </div>
            </div>
        </div>
    )
}

export default QuizCard