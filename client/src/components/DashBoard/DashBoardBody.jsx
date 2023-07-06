import { Grid } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Theme } from '../Theme';
import { AppContext } from '../../App';
import UserCourseUnderProgress from './UserCourseUnderProgress';
import { DashboardContext } from './DashBoard';
import VideoCard from './Cards/VideoCard';
import Playlist_card from './Cards/Playlist_card';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const DashBoardBody = () => {
    const { themeToggler } = useContext(AppContext)

    const {videoRecommendate, courseRecommendate} = useContext(DashboardContext)

    return (
        <>
            <div style={{
                marginTop: '1rem'
            }} >

                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ paddingTop: '0' }}>

                    <Grid item xs={12} sm={12} md={8}>
                        <Item className='card_container' style={{
                            // backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                            boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            textAlign: 'left',
                            padding: '0'
                        }}>
                            <h6>Course Progression</h6>
                            <UserCourseUnderProgress />
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Item className='card_container' style={{
                            // backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                            boxShadow: themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            textAlign: 'left',
                            padding:'0'
                        }}>
                            {
                                videoRecommendate.length <= 0 ? null : <h6>Recommended Videos</h6>
                            }
                            
                            {
                                videoRecommendate.map((e)=>{
                                    return <VideoCard data={e} />
                                })
                            }

                            {
                                courseRecommendate.length <= 0 ? null : <h6 style={{marginTop:'1rem'}} >Recommended Courses</h6>
                            }
                            
                            {
                                courseRecommendate.map((e)=>{
                                    if(e.videoCount <= 0) return null;
                                    return <Playlist_card data={e}/>
                                })
                            }
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default DashBoardBody