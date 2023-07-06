import { CardMedia, Fab } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'


import tempImage from '../../../images/assets/undraw_images_re_0kll.svg'

import { AppContext } from '../../../App';
import { Theme } from '../../Theme';



import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import PlayLessonRoundedIcon from '@mui/icons-material/PlayLessonRounded';

import { formatDate } from '../../Shared/Functions'

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import CircularStatic from './CourseProgress';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CourseInfo = ({ course }) => {

    const navigate = useNavigate();

    const [showMore, setShowMore] = useState(false);
    const [progress, setProgress] = useState(0)

    const { themeToggler } = useContext(AppContext)



    const startCourse = () => {
        navigate(`/video/${course.videos[0]}`)
    }


    const getProgress = async () => {
        try {

            const userRes = await fetch('/about', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const userData = await userRes.json();


            const res2 = await fetch(`/get_course_videos/${userData._id}/${course._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data2 = await res2.json();
            console.log(data2);
            console.log(data2.length * 100 / course.videos?.length);
            setProgress(data2.length * 100 / course.videos?.length);


        } catch (error) {

        }
    }

    useEffect(() => {
        getProgress();
    }, [course])



    return (
        <Grid item xs={12} sm={12} md={6} >
            <Item style={{
                backgroundColor: 'transparent',
                borderRadius: '0',
                padding: '0.5 rem',
                margin: '0',
                boxShadow: 'none',
                textAlign: 'left',
                height: '100%',
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }} >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%'
                }} >

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }} >
                        <h4>{course.name}</h4>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '.4rem'
                        }} >
                            <LayersRoundedIcon color='primary' />{" "}
                            <span style={{ marginLeft: '1rem' }} >
                                {course.videos?.length}{" "} Lessons
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '.4rem'
                        }} >
                            <CalendarMonthRoundedIcon color='primary' />{" "}
                            <span style={{ marginLeft: '1rem' }} >

                                {formatDate(course.createdAt)} {" "} Publish date
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '.3rem'
                        }} >

                            <StyleRoundedIcon color='primary' />{" "}
                            <span style={{ marginLeft: '1rem' }} >
                                Tags
                            </span>
                        </div>
                        <div style={{
                            marginBottom: '1rem'
                        }} >

                            {
                                course.course_tags?.map((tag) => {
                                    return <span style={{
                                        padding: '.3rem .5rem',
                                        borderRadius: '5px',
                                        marginRight: '.5rem',
                                        backgroundColor: themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground
                                    }} > {tag} </span>
                                })
                            }
                        </div>
                        <div style={{
                            marginBottom: '.4rem'
                        }} >
                            {
                                !showMore ?
                                    course.description?.length < 200 ? course.description :
                                        <span>
                                            {course.description?.substring(0, 200) + '...'}
                                            <span onClick={() => setShowMore(true)} style={{
                                                borderRadius: '5px',
                                                marginLeft: '.5rem',
                                                padding: '0 .3rem',
                                                cursor: 'pointer',
                                                backgroundColor: themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground
                                            }} >
                                                more
                                            </span>
                                        </span>

                                    : <span>
                                        {course.description}
                                        <span onClick={() => setShowMore(false)} style={{
                                            borderRadius: '5px',
                                            marginLeft: '.5rem',
                                            padding: '0 .3rem',
                                            cursor: 'pointer',
                                            backgroundColor: themeToggler ? Theme.Dark.FadeBackground : Theme.Light.FadeBackground
                                        }} >
                                            less
                                        </span>
                                    </span>
                            }
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems: 'center',
                    }} >
                        <Fab onClick={startCourse} variant="extended" color="primary" aria-label="add">
                            <PlayLessonRoundedIcon sx={{ mr: 1 }} />
                            Start
                        </Fab>
                        <CircularStatic progress={progress} />
                    </div>
                </div>
            </Item>
        </Grid>

    )
}

export default CourseInfo
