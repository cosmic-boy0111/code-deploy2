import { Divider } from '@mui/material'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import Header from './Header'
import QuestionCard from './QuestionCard'

export const QuizResponsesContext = createContext()

const QuizResponses = () => {

    const { id } = useParams();

    const { themeToggler } = useContext(AppContext);

    const [totalResponse, setTotalResponse] = useState(0)

    const [currentResponse, setCurrentResponse] = useState(0)

    const [view, setView] = useState(true);

    const [headerData, setHeaderData] = useState({
        title: '',
        description: ''
    })

    const [allResponses, setAllResponses] = useState([])

    const getData = async () => {
        try {

            const user = await fetch('/about', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const userData = await user.json();


            const res = await fetch('/getResponses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quizId: id,
                    userId: userData._id
                })
            })

            const data = await res.json();

            const viewRes = await fetch('/getView',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quizId: id,
                    userId: userData._id
                })
            })

            const viewData = await viewRes.json();

            setView(viewData.view);

            setAllResponses(data.responses)

            setCurrentResponse(data.responses.length > 0 ? 1 : 0);

            setTotalResponse(data.responses.length)

            console.log(data);



        } catch (error) {

        }
    }


    useEffect(() => {

        getData();

    }, [])


    return (
        <QuizResponsesContext.Provider value={{
            totalResponse,
            currentResponse,
            setCurrentResponse,
            view,
            setView
        }}>
            <div className='body_margin' >
                <div className='prepare_quiz_body'>
                    <div className='prepare_quiz_container'>
                        <Header />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '5px',
                            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                        }}>
                            <p>Responses cannot be edited</p>
                            <h2>
                                {headerData.title === '' ? 'Untitled Form' : headerData.title}
                            </h2>
                            {
                                headerData.description &&
                                <h6 style={{ marginTop: '1rem' }} >
                                    {
                                        headerData.description.split("\n").map((e) => {
                                            if (e === "") return ``;
                                            return <div> {e} </div>;
                                        })
                                    }
                                </h6>
                            }
                        </div>
                        {
                            allResponses[currentResponse - 1]?.response.map((item,index)=>{
                                if(index === 0) return null;
                                return <QuestionCard question={item} />
                            })
                        }
                    </div>
                </div>
            </div>
        </QuizResponsesContext.Provider>
    )
}

export default QuizResponses