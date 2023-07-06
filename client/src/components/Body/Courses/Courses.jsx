import React, { createContext, useContext, useEffect, useState } from 'react'
import Filter_Accordian from './Filter_Accordian'
import '../../../style/Body/Courses.css'
import CourseContainer from './CourseContainer'
import void_img from '../../../images/assets/undraw_void_-3-ggu.svg'
import { AppContext } from '../../../App'
import CourseSkeletonContainer from './CourseSkeletonContainer'


export const CourseContext = createContext();

const Courses = () => {

  const [courses, setCourses] = useState([])

  const [filterCourses, setFilterCourses] = useState([])

  const [isProgress, setIsProgress] = useState(true)

  const {rootUser} = useContext(AppContext)

  const [selectedTags, setSelectedTags] = useState([]);
  const [dateFilter, setDateFilter] = useState([
    { name: 'Today', checked: false, days: 1 },
    { name: 'This Week', checked: false, days: 7 },
    { name: 'This Month', checked: false, days: 31 },
    { name: 'This Year', checked: false, days: 365 },
  ])

  const [searchText, setSearchText] = useState('')


  const getData = async () => {
    console.log('get playlist');
    try {
      setIsProgress(true);
      const userRes = await fetch('/about', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const userData = await userRes.json()

      console.log(userData);

      const res = await fetch('/suggestedCourseAccordingToTitles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          userId : userData._id
        })
      })

      const data = await res.json();
      console.log("Courses of data");
      console.log(data);
      setCourses(data);
      setIsProgress(false);
      setFilterCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  const filterCoursesAccordingToFilter = () => {


    var checkedTags = [];
    selectedTags.forEach(element => {
      if (element.checked) {
        checkedTags.push(element.name);
      }

    });


    var courses_filter = checkedTags.length > 0 ? [] : courses;

    courses.forEach(element => {
      if (element.course_tags.some(r => checkedTags.includes(r))) {
        courses_filter.push(element);
      }
    });

    var days = 0;
    dateFilter.forEach(element => {
      console.log(element);
      if (element.checked) {
        days = element.days;
        return;
      }
    });
    console.log(days);

    var date_filter = [];
    if (days > 0) {


      courses_filter.forEach(element => {
        const date = new Date();
        const date1 = new Date(date);
        const date2 = new Date(element.createdAt);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= days) {
          date_filter.push(element);
        }
      })
    }
    // console.log(courses_filter, date_filter);
    date_filter = days > 0 ? date_filter : courses_filter;
    // console.log(courses_filter, date_filter);


    if(searchText !== ''){
      date_filter = date_filter.filter(element => 
        element.name.toLowerCase().includes(searchText.toLowerCase()) ||
        element.description.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    setFilterCourses(date_filter);



  }


  useEffect(() => {
    filterCoursesAccordingToFilter();
  }, [selectedTags, dateFilter,searchText]);


  return (
    <CourseContext.Provider value={{
      filterCourses,
      setFilterCourses,
      courses,
      filterCoursesAccordingToFilter,
      selectedTags,
      setSelectedTags,
      dateFilter,
      setDateFilter,
      searchText,
      setSearchText,
    }}>
      <div className='body_margin'>
        {
          isProgress ? <CourseSkeletonContainer /> :
          courses.length === 0 ? <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
            <img src={void_img} alt="" srcset="" style={{
              width: '300px',
              height: '100%',
            }} />
            <h5 style={{
              marginTop: '1rem'
            }} >No Course Available</h5>
          </div> : <>
            <Filter_Accordian />
            <CourseContainer />
          </>
        }
      </div>
    </CourseContext.Provider>
  )
}

export default Courses