import React, { useContext, useEffect, useState } from 'react'
import CourseProgress from './CourseProgress'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'

const CoursesCard = ({ data }) => {

  const { themeToggler, rootUser } = useContext(AppContext)
  const [thumbnail, setThumbnail] = useState('')

  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const gotoVideo = () => {
    navigate(`/course/${data._id}`)
  }

  const getData = async () => {
    try {
      const res = await fetch(`/getThumbnailsFile/${data.firstVideoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const file = await res.json();
      setThumbnail(file.file);

      const userRes = await fetch('/about',{
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        }
    })

    const userData = await userRes.json();
  

      const res2 = await fetch(`/get_course_videos/${userData._id}/${data._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data2 = await res2.json();
      console.log(data2);
      console.log(data2.length * 100 / data.videoCount);
      setProgress(data2.length * 100 / data.videoCount);

    } catch (error) {

    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='user_course_card' onClick={gotoVideo}  style={{
      // backgroundImage : `url(${thumbnail})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      borderRadius: '5px',
      cursor:'pointer',
      height: '200px',
      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
    }}>
      <div className='lesson_Holder' style={{
        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        display:'flex',
        justifyContent:'space-between',
        width : '100%',
        padding:'0'
      }}>
        {
          thumbnail === '' ? <Skeleton variant="rounded" width={90} height={50} /> :
            <img src={thumbnail} alt="" srcset="" style={{
              width: '110px',
              // height: '100',
              borderRadius: '5px'
            }} />
        }
        <div>

          <span style={{ marginRight: '.5rem' }}>   {data.videoCount} </span>
          <span>Lessons</span>
        </div>

      </div>
      <div className='under_bottom_card'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          borderRadius: '5px',
          alignItems: 'center',
          // width:'100%'
        }}
      >
        <div style={{
          display:'inline-flex',
          flexDirection: 'column',
          textAlign:'left',
          // width:'70%',
          position:'relative'
        }} >

          <h5 style={{
            width: '100%',
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }} > {data.name.length > 20 ? data.name.substring(0,20)+'...' : data.name} </h5>
          <p style={{
            width: '100%',
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}>
            {data.description.length > 30 ? data.description.substring(0,30)+'...' : data.description}
          </p>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          // width:'30%'
        }}>

          <CourseProgress progress={progress} />
        </div>
      </div>
    </div>
  )
}

export default CoursesCard