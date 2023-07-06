import React, { useContext } from 'react'
import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';
import Checkboxes from './Types/CheckBoxes';
import LongAnswer from './Types/LongAnswer';
import MultipleChoice from './Types/MultipleChoice';
import ShortAnswer from './Types/ShortAnswer';

const QuestionCard = ({question}) => {

    const {themeToggler} = useContext(AppContext);

  return (
    <div style={{
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '5px',
        backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        padding: '1rem',
        color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor,
    }} >
        <div style={{
            display:'flex',
        }}>

        {
            question.question.split("\n").map((e) => {
                if (e === "") return ``;
                return <div> {e} </div>;
            })
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
             question.question_type === 0 ? <ShortAnswer question={question} /> : 
                question.question_type === 1 ? <LongAnswer question={question}/> :
                    question.question_type === 2 ? <MultipleChoice question={question} /> :
                        question.question_type === 3 ? <Checkboxes question={question} /> : null
        }
    </div>
  )
}

export default QuestionCard