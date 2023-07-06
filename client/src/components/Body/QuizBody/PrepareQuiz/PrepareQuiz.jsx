import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../../App'
import Card from './Card';

import { Button, CardMedia, IconButton, Tooltip } from '@mui/material'
import quiz from '../../../../images/assets/quize.jpg'

import DragDrop from './Drag';
import Header from './Header';

import { RWebShare } from 'react-web-share';
import axios from 'axios';

import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';



export const PrepareQuizContext = createContext();

const PrepareQuiz = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState([])

  const { themeToggler } = useContext(AppContext);

  const [rootUser, setRootUser] = useState({})

  const [headerFields, setHeaderFields] = useState({
    title: '',
    description: ''
  })


  const getData = async () => {
    try {

      const user = await fetch('/about', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })

      const userData = await user.json();
      setRootUser(userData);


      const headerRes = await fetch('/headerData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData._id,
          quizId: id
        })
      })


      const headerData = await headerRes.json();
      console.log(headerData);
      setHeaderFields(headerData)


      const res = await fetch('/fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userData._id,
          quizId: id
        })
      })

      const res_data = await res.json();
      console.log(res_data);
      setData(res_data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const Add = async (index) => {
    try {

      setData((pre) => {
        return [...pre, {
          question: '',
          question_type: 2,
          isRequired: false,
          options: []
        }]
      })
      const res = await fetch('/addField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          quizId: id,
          index: index,
          data: {
            question: '',
            question_type: 2,
            isRequired: false,
            options: ['Option 1'],
            question_img: ''
          }

        })
      })

      getData();

    } catch (error) {

    }
  }

  const Copy = async (index) => {
    try {
      var ele = data[index - 1]


      const res = await fetch('/addField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          quizId: id,
          index: index,
          data: {
            question: ele.question,
            question_type: ele.question_type,
            isRequired: ele.isRequired,
            options: ele.options,
            question_img: ele.question_img
          }

        })
      })

      const res_data = await res.json();

      // setData(res_data)
      console.log(res_data);

      getData();

    } catch (error) {

    }
  }

  const Update = async (index, data) => {
    try {
      console.log('under update');
      console.log(data);
      const res = await fetch('/updateField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          quizId: id,
          index: index,
          data: { ...data }
        })
      })

      getData();

    } catch (error) {

    }
  }


  const ReorderData = async (startIndex, endIndex) => {
    try {

      const [removed] = data.splice(startIndex, 1);
      data.splice(endIndex, 0, removed);

      const res = await fetch('/reorderList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          quizId: id,
          startIndex: startIndex,
          endIndex: endIndex
        })
      })


      getData();

    } catch (error) {
      console.log(error);
    }
  }


  const Delete = async (index) => {
    try {


      var updatedData = data.filter((item, pos) => pos !== index)
      setData(updatedData);

      const res = await fetch('/deleteField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          quizId: id,
          data: updatedData
        })
      })


      getData();

    } catch (error) {

    }
  }


  const updateHeader = async () => {
    try {
      const res = await fetch('/updateTitDes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: rootUser._id,
          quizId: id,
          title: headerFields.title,
          description: headerFields.description
        })
      })
    } catch (error) {

    }
  }

  const uploadQuestionImage = async (file, index) => {

    try {

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'image');
      formData.append('index', index);
      formData.append('userId', rootUser._id)
      formData.append('quizId', id)
      formData.append('pre_img', data[index].question_img)
      const response = await fetch('/uploadFieldFile', {
        method: 'POST',
        body: formData
      });

      getData();

    } catch (error) {

    }



  }


  const deleteQuestionImage = async (index) => {

    try {

      const response = await fetch('/deleteFieldFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'image',
          index: index,
          userId: rootUser._id,
          quizId: id,
          pre_img: data[index].question_img
        })
      });

      getData();

    } catch (error) {

    }



  }

  return (
    <PrepareQuizContext.Provider value={{
      Add,
      Copy,
      Update,
      Delete,
      ReorderData,
      updateHeader,
      uploadQuestionImage,
      deleteQuestionImage,
      setData,
      data
    }}>
      
      <div className='body_margin' >
        <div className='prepare_quiz_body'>
          <div className='prepare_quiz_container'>
            <CardMedia
              component="img"
              height="150"
              src={quiz}
              style={{
                objectFit: 'cover',
                borderRadius: '5px',
                // marginBottom: '1rem'
              }}
            />
            <div style={{
              display:'flex',
              width:'100%',
              justifyContent:'flex-end',
              margin:'.5rem 0'
            }} >
              <Button variant='contained' style={{
                marginRight: '1rem'
              }}
                onClick={()=>{
                  navigate(`/quiz/responses/${id}`)
                }}
              >
                 Responses
              </Button>
              <RWebShare
                data={{
                  text: "check out this amazing quiz",
                  url: `${window.location.origin}/quiz/solve/${id}`,
                  title: "Code++ Quiz",
                }}
                onClick={() => console.log("shared successfully!")}
              >

                <Button variant='contained' style={{
                  // marginTop: '1rem'
                }}>
                  Send
                </Button>
              </RWebShare>
            </div>
            <Header headerFields={headerFields} setHeaderFields={setHeaderFields} />
            <DragDrop>

              {
                data.map((item, index) => {
                  return <div id={`${index}`}>
                    <Card
                      index={index}
                      question={item.question}
                      question_type={item.question_type}
                      isRequired={item.isRequired}
                      options={item.options}
                      question_img={item.question_img}
                    />
                  </div>
                })
              }
            </DragDrop>

          </div>
        </div>
      </div>
    </PrepareQuizContext.Provider>
  )
}

export default PrepareQuiz
