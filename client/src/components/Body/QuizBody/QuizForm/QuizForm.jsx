import { Button, CardMedia, Divider } from '@mui/material'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../../App'
import quiz from '../../../../images/assets/quize.jpg'
import { Theme } from '../../../Theme'
import QuestionCard from './QuestionCard'

export const QuizFromContext = createContext();

const QuizForm = () => {
    const { themeToggler, rootUser } = useContext(AppContext)
    const { id } = useParams();

    const navigate = useNavigate();

    const [headerData, setHeaderData] = useState({
        title: '',
        description: ''
    })

    const [questions, setQuestions] = useState([])

    const [userResponse, setUserResponse] = useState([])

    const [checkRequired, setCheckRequired] = useState(false);

    const [userId, setUserId] = useState('')

    const [alreadyResponse, setAlreadyResponse] = useState({});

    const [view, setView] = useState(true);

    const [notExits, setNotExits] = useState(false)


    const getData = async () => {
        try {

            const res = await fetch(`/getFormQuiz/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json();

            console.log(data);

            setView(data.AcceptResponse);

            setUserId(data.userId);

            const user = await fetch('/about', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const userData = await user.json();


            const checkRes = await fetch('/checkAlreadyResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: data.userId,
                    quizId: id,
                    responser_id: userData._id
                })
            })

            const checkData = await checkRes.json();

            setAlreadyResponse(checkData)

            console.log(checkData);



            if (localStorage.getItem(id) === null) {


                var arr = [];
                for (var i = 0; i < data.fields.length; i++) {
                    arr.push({
                        ...data.fields[i],
                        answer: data.fields[i].question_type === 3 ? [] : ''
                    })
                }
                setUserResponse(arr);

                localStorage.setItem(id, JSON.stringify(arr));
            } else {
                setUserResponse(JSON.parse(localStorage.getItem(id)))
            }

            setHeaderData({
                title: data.title,
                description: data.description,
            })
            console.log(data.fields);
            setQuestions(data.fields);


        } catch (error) {
            setNotExits(true);
            console.log("form not exits");
        }
    }

    useEffect(() => {

        getData();

    }, [])


    const submitResponse = async () => {

        const viewRes = await fetch('/getView',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quizId: id,
                userId: userId
            })
        })

        
        const viewData = await viewRes.json();

        console.log(viewData);
        
        setView(viewData.view);
        
        if(!viewData.view) return;
        console.log("hello world");

        for (let i = 0; i < userResponse.length; i++) {
            if (userResponse[i].question_type === 3) {
                if (userResponse[i].answer.length === 0 && userResponse[i].isRequired) {
                    setCheckRequired(true);
                    return;
                }
                continue;
            }
            if (userResponse[i].answer === '' && userResponse[i].isRequired) {
                setCheckRequired(true);
                return;
            }
        }

        try {

            const res = await fetch('/addQuizResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    quizId: id,
                    responser_id: rootUser._id,
                    response: [
                        {
                            question: 'DateTime',
                            answer: (new Date()).toLocaleString()
                        },
                        ...userResponse
                    ]
                })
            })

            setAlreadyResponse({
                present: true
            });
            localStorage.removeItem(id);
            console.log(res.json());

        } catch (error) {
            console.log(error);
        }

    }


    const clearForm = () => {
        localStorage.removeItem(id);
        getData();
    }


    return (
        <>
            {notExits ? <div className='body_margin' >
                    <div className='prepare_quiz_body'>
                        <div className='prepare_quiz_container'>
                            <div style={{
                                marginTop: '1rem',
                                marginBottom: '1rem',
                                borderRadius: '5px',
                                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                padding: '1.5rem',
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            }} >
                                <div style={{ fontWeight:'bold' }} >Sorry, the file you have requested does not exist.</div>
                                <p>Make sure that you have the correct URL and that the file exists.</p>
                                <Button variant='contained' onClick={() => {
                                        navigate('/')
                                    }} >
                                        Go To Home Page
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> :
                view === false ? <div className='body_margin' >
                    <div className='prepare_quiz_body'>
                        <div className='prepare_quiz_container'>
                            <div style={{
                                marginTop: '1rem',
                                marginBottom: '1rem',
                                borderRadius: '5px',
                                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                padding: '1.5rem',
                                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                            }} >
                                <h3>{headerData.title === '' ? 'Untitled Form' : headerData.title}</h3>
                                <div>The form {headerData.title === '' ? 'Untitled Form' : headerData.title} is no longer accepting responses.</div>
                                <p>Try contacting the owner of the form if you think that this is a mistake.</p>
                                {
                                    rootUser._id === userId &&
                                <Button variant='contained' onClick={() => {
                                    navigate(`/quiz/prepare/${id}`)
                                }} >
                                    Edit Form
                                </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div> :
                    alreadyResponse.present ? <div className='body_margin' >
                        <div className='prepare_quiz_body'>
                            <div className='prepare_quiz_container'>
                                <div style={{
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                    borderRadius: '5px',
                                    backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                    padding: '1.5rem',
                                    color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                                }} >
                                    <h3>{headerData.title === '' ? 'Untitled Form' : headerData.title}</h3>
                                    <p>Your response has been recorded.</p>
                                    <Button variant='contained' onClick={() => {
                                        navigate('/')
                                    }} >
                                        Go To Home Page
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div> :

                        <QuizFromContext.Provider value={{
                            userResponse,
                            setUserResponse,
                            checkRequired,
                            setCheckRequired
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
                                                marginBottom: '1rem'
                                            }}
                                        />
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '1rem',
                                            marginBottom: '1rem',
                                            borderRadius: '5px',
                                            backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                                            color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
                                        }}>
                                            <h2>
                                                {headerData.title === '' ? 'Untitled Form' : headerData.title}
                                            </h2>
                                            {
                                                headerData.description &&
                                                <>
                                                    <Divider />
                                                    <h6 style={{ marginTop: '1rem' }} >
                                                        {
                                                            headerData.description.split("\n").map((e) => {
                                                                if (e === "") return ``;
                                                                return <div> {e} </div>;
                                                            })
                                                        }
                                                    </h6>
                                                </>
                                            }
                                            <p style={{ color: '#d32f2f' }} >* Required</p>
                                        </div>
                                        <div>
                                            {
                                                questions.map((item, index) => {
                                                    return <QuestionCard index={index} question={item} />
                                                })
                                            }
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }} >
                                            <Button variant='contained' onClick={submitResponse}>
                                                Submit
                                            </Button>
                                            <Button onClick={clearForm} >
                                                Clear Form
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </QuizFromContext.Provider>
            }
        </>
    )
}

export default QuizForm