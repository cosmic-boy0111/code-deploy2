import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../App'
import { Theme } from '../../Theme'
import { CourseContext } from './Courses'

const More_filter_tags = ({ tag, setSelectedTags, isDate = false }) => {
  const { themeToggler } = useContext(AppContext);

  const { setFilterCourses, courses, filterCoursesAccordingToFilter } = useContext(CourseContext);




  const toggleTag = () => {
    setSelectedTags((pre) => {
      var arr = []
      pre.forEach(element => {
        if (element !== tag) {
          arr.push(
            isDate ? {
              name: element.name,
              checked: false,
              days : element.days
            } : element
          )
        } else {

          arr.push( isDate ? {
            name: element.name,
            checked: !element.checked,
            days : element.days
          } : {
            name: element.name,
            checked: !element.checked
          })
        }
      });
      console.log(arr);
      return arr;
    })
  }

  return (
    <div className='filter_element' onClick={toggleTag} style={{
      backgroundColor: tag === undefined ? null : tag.checked ? "#a5d6a7" : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor
    }}>

      <span>{tag === undefined ? null : tag.name}</span>
    </div>
  )
}

export default More_filter_tags