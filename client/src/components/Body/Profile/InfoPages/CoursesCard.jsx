import React, { useContext, useEffect, useState } from 'react'
import img from '../../../../images/assets/Programming_language/js.png'
import CourseProgress from './CourseProgress'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import { useNavigate, useParams } from 'react-router-dom'

const CoursesCard = ({data}) => {

    const navigate = useNavigate();

    const {themeToggler,rootUser} = useContext(AppContext)
    const [thumbnail, setThumbnail] = useState('')
    const {id} = useParams();

    const [progress, setProgress] = useState(0);

    const getData = async () =>{
        try {
          const res = await fetch(`/getThumbnailsFile/${data.firstVideoId}`,{
            method : 'GET',
            headers : {
              'Content-Type' : 'application/json'
            }
          })
    
          const file = await res.json();
          setThumbnail(file.file);

          const res2 = await fetch(`/get_course_videos/${id}/${data._id}`,{
            method : 'GET',
            headers : {
              'Content-Type' : 'application/json'
            }
          })

          const data2= await res2.json();
          console.log(data2);
          console.log(data2.length * 100 / data.videoCount);
          setProgress(data2.length * 100 / data.videoCount);

        } catch (error) {
          
        }
      }
  
      useEffect(() => {
        getData();
      }, [])


  const gotoCourse = () => {
    navigate(`/course/${data._id}`)
  }

  return (
    <div onClick={gotoCourse}  className='user_course_card' style={{
        backgroundImage : `url(${thumbnail})`,
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
        backgroundPosition : 'center',
        cursor : 'pointer',
        // width: window.screen.width <= '900' ? '100%' : '250px'
        width:'250px'
    }}>
        <div className='lesson_Holder' style={{
            backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
        }}>
            <span style={{marginRight:'.5rem'}}>   {data.videoCount} </span>
            <span>Lessons</span>

        </div>
        <div className='under_bottom_card'>
            <h3 style={{
              width: '100%',
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: 'nowrap',
              cursor:'pointer',
              color:'white'
            }} > {data.name} </h3>
            <p style={{
              width: '100%',
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: 'nowrap',
              cursor:'pointer',
              color:'white'
            }}>
                {data.description}
            </p>
            <div style={{
                display:'flex',
                justifyContent:'flex-end'
            }}>

            <CourseProgress progress={progress}/>
            </div>
        </div>
    </div>
  )
}

export default CoursesCard