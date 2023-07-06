import React from 'react'
import {Theme} from '../../../Theme'
import { useContext } from 'react'
import {AppContext} from '../../../../App'
import { useNavigate } from 'react-router-dom'
const Problem = ({problem,index}) => {
  const navigate = useNavigate();
  const {themeToggler} = useContext(AppContext)

  const diff = ["Easy", "Medium", "Hard"];
  const col = ["#00e676", "#eeff41", "#ff6e40"];
  const getDiff = (df) => {
    return (
      <span
        style={{
          backgroundColor: `${col[df]}`,
          borderRadius: "20px",
          fontSize: "15px",
          padding: ".2rem .5rem",
          textTransform: "lowercase",
          color:'black'
        }}
      >
        {" "}
        {diff[df]}{" "}
      </span>
    );
  };

  const go = () =>{
    navigate(`/compiler/${problem.title}/${problem._id}`)
  }

  return (
    <div className='problem_holder' style={{
      backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      border : themeToggler ? Theme.Dark.Border : Theme.Light.Border,
      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
    }}
      onClick={go}
    > 
      <div className='problem_holder1' ><span style={{color:'#1890ff',marginLeft:'.5rem'}}> {problem.title} </span></div>
      <div className='problem_holder2'> {problem.mainTag} {getDiff(problem.difficulty)} </div>
    </div>
  )
}

export default Problem