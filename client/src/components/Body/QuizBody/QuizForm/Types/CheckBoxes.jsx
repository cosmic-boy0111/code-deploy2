import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom';
import { QuizFromContext } from '../QuizForm';

export default function Checkboxes({ index, options }) {


    const { id } = useParams();

    const { userResponse, setUserResponse, setCheckRequired } = React.useContext(QuizFromContext);

    const [chooseOptions, setChooseOptions] = React.useState([])

    React.useEffect(() => {
       var opt = JSON.parse(localStorage.getItem(id))[index].answer;
       setChooseOptions(opt);
    }, [userResponse])


    const checkOption = (isPresent, val) => {
        var arr = [];
        if(isPresent){
            arr = chooseOptions.filter((op)=> op !== val);
        }else{
            arr = [...chooseOptions, val]
        }

        setChooseOptions(arr);

        if(userResponse[index].isRequired){
            setCheckRequired(false)
        }

        var ele = {
            ...userResponse[index],
            answer : arr
        }

        userResponse[index] = ele;
        localStorage.setItem(id, JSON.stringify(userResponse));
        setUserResponse(userResponse);

    }

    return (
        <FormGroup>
            {
                options.map((option) => {
                    return <FormControlLabel  onClick={()=>checkOption(chooseOptions.includes(option), option)} control={<Checkbox  checked={chooseOptions.includes(option)} />} label={option} />
                })
            }

        </FormGroup>
    );
}