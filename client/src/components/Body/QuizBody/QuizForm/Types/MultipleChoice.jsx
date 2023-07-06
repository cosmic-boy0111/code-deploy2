import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { QuizFromContext } from '../QuizForm';
import { useParams } from 'react-router-dom';

export default function MultipleChoice({index,options}) {

    const {id} = useParams();

    const {userResponse, setUserResponse, setCheckRequired} = React.useContext(QuizFromContext);

    const [choice, setChoice] = React.useState('')

    React.useEffect(() => {
        setChoice(userResponse[index]?.answer)
    }, [userResponse])
    

    const setOption = (val) => {

        setChoice(val);
        if(userResponse[index].isRequired){
            setCheckRequired(false);
        }

        var ele = {
            ...userResponse[index],
            answer : val
        }

        userResponse[index] = ele;
        localStorage.setItem(id, JSON.stringify(userResponse));
        setUserResponse(userResponse);
    }

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={(e)=>setOption(e.target.value)}
        value={choice}
      >
        {
            options.map((option)=>{
                return <FormControlLabel value={option} control={<Radio />} label={option} />
            })
        }
      </RadioGroup>
    </FormControl>
  );
}