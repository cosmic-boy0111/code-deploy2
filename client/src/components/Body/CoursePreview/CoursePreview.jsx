import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CardMedia, Fab } from '@mui/material';

import CourseThumbnail from './CourseThumbnail';
import CourseInfo from './CourseInfo';
import CourseVideo from './CourseVideo';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const CoursePreview = () => {

  useEffect(() => {
    var myDiv = document.getElementsByTagName("body")[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const [course, setCourse] = useState({})
  const [thumbnail, setThumbnail] = useState('')

  const { themeToggler } = useContext(AppContext)


  const getCourse = async () => {
    try {

      const res = await fetch(`/getPreviewCourse/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      console.log(data);
      setCourse(data);

      const resFile = await fetch(`/previewCourse/thumbnail/${data.videos[0]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const dataFile = await resFile.json()
      console.log(dataFile.file);
      setThumbnail(dataFile.file)

    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {

    getCourse();

  }, [id])


  return (
    <div className='body_margin'>
      <div style={{
        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        borderRadius: '10px',
      }}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <CourseThumbnail thumbnail={thumbnail} />
          <CourseInfo course={course} />
        </Grid>
      </div>
      <div style={{
        marginTop:'1rem'
      }}>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {course.videos?.map((id, index) => (
            <CourseVideo id = {id} index={index}/>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default CoursePreview
