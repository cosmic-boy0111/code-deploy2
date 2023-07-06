import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';

export default function MultipleChoice({question}) {


  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={question.answer}
      >
        {
            question.options.map((option)=>{
                return <FormControlLabel value={option} control={<Radio />} label={option} />
            })
        }
      </RadioGroup>
    </FormControl>
  );
}