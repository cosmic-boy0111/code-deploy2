import { CardMedia } from '@mui/material'
import React, { useContext } from 'react'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';


import { AppContext } from '../../../App'
import { Theme } from '../../Theme';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ course }) => {
    const {themeToggler} = useContext(AppContext);
    
    const navigate = useNavigate();
  const goToCourse = () =>{
    navigate(`/course/${course._id}`)
  }
    return (
        <div onClick={goToCourse}>

            <CardMedia
                component="img"
                height={ window.screen.width <= '600' ? "200" : "170"}
                image={course.playListImg}
                alt="green iguana"
                style={{
                    borderRadius: '5px'
                }}
            />

            <div style={{
                padding: '1rem'
            }}>
                <div style={{
                    width: '100%',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: 'nowrap',
                    fontSize: '15px'
                }}>
                    {course.name}
                </div>
                <div className='my-1' style={{
                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                }}>
                    { course.description.length > 60 ? course.description.substring(0,60) + '...' : course.description}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <LayersRoundedIcon color='secondary' />
                    <span style={{ marginLeft: '.5rem' }} >{course.videoCount} Lessons</span>
                </div>
            </div>

        </div>
    )
}

export default CourseCard