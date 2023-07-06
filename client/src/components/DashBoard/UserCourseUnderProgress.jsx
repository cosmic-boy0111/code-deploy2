import { Box, Button, CardMedia, Grid, Skeleton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Theme } from '../Theme';
import { AppContext } from '../../App';
import CoursesCard from './ProgressCourses/CoursesCard';
import { DashboardContext } from './DashBoard';

import empty from '../../images/assets/undraw_floating_re_xtcj.svg'
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserCourseUnderProgress = () => {

  const navigate = useNavigate();

    const {rootUser, themeToggler}  = useContext(AppContext);

    const {setVideoRecommendate, setCourseRecommendate} = useContext(DashboardContext)

  const [courses, setCourses] = useState([])

  const [courseProgress, setCourseProgress] = useState(true)

  const getData = async () => {


    try {

        setCourseProgress(true)
        console.log("progress start");

        const userRes = await fetch('/about',{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json'
            }
        })

        const userData = await userRes.json();
      
      const res = await fetch(`/get_user_courses/${userData._id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data = await res.json();
      console.log(data);

      var requiredData = data.slice(0,4);
      setCourses(requiredData);

      console.log("progress end");
      setCourseProgress(false);

      var titles = [];
      requiredData.forEach(element => {
        titles.push(element.name)
      });

      console.log(titles);

      const videoRes = await fetch('/videoRecommendationWithBulkTitles',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            titles : titles
        })
      })

      const videoData = await videoRes.json();
      console.log(videoData.slice(0,3));
      setVideoRecommendate(videoData.slice(0,3))

      const courseRes = await fetch('/suggestedCourseAccordingToTitles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          userId : userData._id
        })
      })

      const courseData = await courseRes.json();
      var next_course = [];
      courseData.forEach(element => {
        var is_present = false;
        requiredData.forEach(e => {
          if(e.name === element.name){
            is_present = true;
            return;
          }
        });
        if(!is_present){
          next_course.push(element);
        }
      });
      var requiredCourseData = next_course.slice(0,3);
      console.log(requiredCourseData);
      setCourseRecommendate(requiredCourseData);


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const visitCourses = () => {
    navigate('/courses')
  }
  

  return (
    <div>
      
      <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ paddingTop: '0' }}>
              {
                courseProgress ? [1,2,3,4].map(()=>{
                  return <Grid item xs={4} sm={4} md={6}>
                  <Item style={{
                      padding:'0',
                      backgroundColor:'transparent',
                      border:'none',
                      boxShadow:'none'
                  }}>

                  <Skeleton variant="rounded" width={'100%'} height={'200px'} />
                  </Item>
                  </Grid>
                }) : courses.length === 0 ? <Grid item xs={12} sm={12} md={12}>
                <Item style={{
                    padding:'0',
                    backgroundColor:'transparent',
                    border:'none',
                    boxShadow:'none',
                    display:'flex',
                    height:'300px',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                }}>
                  <span>No Course is completed or under progression</span>
                    <CardMedia
                      component={'img'}
                      src={empty}
                      controls
                      width={'150px'}
                      height={'150px'}
                      style={{

                        objectFit: 'fill',
                        borderRadius: '10px',
                        marginBottom:'1rem'
                      }}
                    />
                    <Button onClick={visitCourses} color='primary' variant="outlined" >
                      start Your Journey
                    </Button>
                </Item>
              </Grid> :
                courses.map((e) => {
                  return <Grid item xs={4} sm={4} md={6}>
                    <Item style={{
                        padding:'0',
                        backgroundColor:'transparent',
                        border:'none',
                        boxShadow:'none'
                    }}>
                      <CoursesCard data={e}/>
                    </Item>
                  </Grid>
                })
              }
              
            </Grid>
          </Box>
    </div>
  )
}

export default UserCourseUnderProgress