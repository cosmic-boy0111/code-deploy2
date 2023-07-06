import { Avatar } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'

import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import { Button } from '@mui/material';

import { VideoPageContext } from './VideoPage';
const ChannelInfo = ({ user_id, description }) => {


    const { themeToggler, rootUser } = useContext(AppContext)
    const [toggle, setToggle] = useState(false)

    const { channelInfo } = useContext(VideoPageContext)


    const expand = () => {
        setToggle(!toggle)
    }

    return (
        <div className='channel_info_for_video px-2 '>
            <div>

                <Avatar src={channelInfo.img} className='point' />
            </div>
            <div className='info_about_video_channel'>
                <div className='info_about_video_channel1'>
                    <div>
                        <div>{channelInfo.name}</div>
                        <div>{channelInfo.subCounts === 0 ? 'No Subscribers' : `${channelInfo.subCounts} Subscribers`}</div>
                    </div>
                    <div>
                        {
                            user_id === rootUser._id ? null :
                                <Button variant="contained" color='secondary' >Subscribe</Button>
                        }
                    </div>

                </div>
                <div className='my-2 video_description'>
                    {description === undefined
                        ? ``
                        : toggle ? description.split("\n").map((e) => {
                            if (e === "") return ``;
                            return <p> {e} </p>;
                        }) : description.slice(0, 100)
                    }

                    {
                        description === undefined || description.length < 100 ? null :
                            <div style={{
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                            }}>

                                <span onClick={expand} style={{
                                    cursor: 'pointer'
                                }}>
                                    SHOW {toggle ? 'LESS' : 'MORE'}
                                </span>
                            </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default ChannelInfo