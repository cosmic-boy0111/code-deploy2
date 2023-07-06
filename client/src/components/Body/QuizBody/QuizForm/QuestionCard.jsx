import React, { useContext } from 'react'
import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'
import { QuizFromContext } from './QuizForm';
import Checkboxes from './Types/CheckBoxes';
import LongAnswer from './Types/LongAnswer';
import MultipleChoice from './Types/MultipleChoice';
import ShortAnswer from './Types/ShortAnswer';

const QuestionCard = ({ index , question }) => {

    const { themeToggler } = useContext(AppContext);

    const {userResponse,checkRequired} = useContext(QuizFromContext)

    return (
        <div>
            <div style={{
                marginTop: '1rem',
                marginBottom: '1rem',
                borderRadius: '5px',
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                padding: '1rem',
                color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
                border: question.isRequired && checkRequired && (
                    question.question_type === 3 ? userResponse[index]?.answer.length === 0 :
                    userResponse[index].answer === ''
                    ) ?  '1px solid #d32f2f' : `1px solid ${themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor}`
            }} >
                <div style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                <div>

                {
                    question.question.split("\n").map((e) => {
                        if (e === "") return ``;
                        return <div> {e} </div>;
                    })
                }
                </div>
                {
                    question.isRequired ? <span style={{ color : '#d32f2f' }} >*</span> : null
                }
                
                </div>
                {
                    question.question_img === "" ? null :
                        <img src={question.question_img} alt="" srcset="" style={{
                            width: '100%',
                            margin: '1rem 0',
                            borderRadius: '5px'
                        }} />
                }
                {
                    question.question_type === 0 ? <ShortAnswer index={index} /> :
                        question.question_type === 1 ? <LongAnswer index={index}/> :
                            question.question_type === 2 ? <MultipleChoice index={index} options={question.options} /> :
                                question.question_type === 3 ? <Checkboxes index={index} options={question.options}  selected={userResponse[index]?.answer} /> : null
                }
            </div>
        </div>
    )
}

export default QuestionCard