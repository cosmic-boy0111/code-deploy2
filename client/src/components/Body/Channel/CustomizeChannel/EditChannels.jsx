import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChannelCard from './ChannelCard';
import { ChannelContext } from '../Channel';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const EditChannels = () => {

    const {channelList, setChannelList} = useContext(ChannelContext)

    const {themeToggler} = useContext(AppContext)
    

    return (
        <div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                {Array.from(Array(channelList.length)).map((_, index) => (
                    <Grid item xs={12} sm={12} md={12} key={index}>
                        <Item className='card_container' style={{
                            backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                            // boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                            border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                            textAlign: 'initial'
                        }}>
                            <ChannelCard data={channelList[index]} setCustomChannelList={setChannelList}/>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default EditChannels