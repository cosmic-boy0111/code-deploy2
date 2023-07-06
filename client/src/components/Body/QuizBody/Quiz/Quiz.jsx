import React, { createContext, useContext, useEffect, useState } from 'react'
import QuizHeader from './QuizHeader'
import '../../../../style/Body/Quiz.css'
import QuizBody from './QuizBody'
import { Button, Fab } from '@mui/material'
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import ResponsiveDialog from './QuizDialog'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../../App'

export const QuizContext = createContext();

const Quiz = () => {


  const { rootUser } = useContext(AppContext);

  useEffect(() => {
    var myDiv = document.getElementsByTagName("body")[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate()


  const [quizList, setQuizList] = useState([])

  const [allQuiz, setAllQuiz] = useState([])


  const getQuizList = async() => {
    try {
      const user = await fetch('/about', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const userData = await user.json();

      console.log("under getQuiz");
      const res = await fetch(`/getAllQuiz/${userData._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      
      const qData = await res.json();
      console.log("quiz",qData);
      setQuizList(qData)
      setAllQuiz(qData);

    } catch (error) {
      
    }
  }


  useEffect(() => {
    getQuizList();
  }, [])


  const gotoPrepare = async () => {

    try {



      const res = await fetch(`/prepareQuiz/${rootUser._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();

      navigate(`/quiz/prepare/${data._id}`)

    } catch (error) {

    }

  }


  const DeleteQuiz = async (id) =>{
    try {
      const res = await fetch(`/quiz/delete/${id}`);
      getQuizList();
    } catch (error) {
      
    }
  }

  return (
    <QuizContext.Provider value={{
      DeleteQuiz,
      quizList,
      setQuizList,
      allQuiz
    }}>
      <div className='body_margin'>
        <QuizHeader />
        <QuizBody />
        <div className='create_post'>
          <Fab color="primary" variant="extended" onClick={gotoPrepare} >
            <PostAddRoundedIcon sx={{ mr: 2 }} />
            Add Quiz
          </Fab>
        </div>
        {/* <ResponsiveDialog /> */}
      </div>
    </QuizContext.Provider>
  )
}

export default Quiz