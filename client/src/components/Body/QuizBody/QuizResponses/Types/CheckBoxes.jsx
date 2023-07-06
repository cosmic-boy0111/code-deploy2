import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom';

export default function Checkboxes({ question }) {


    return (
        <FormGroup>
            {
                question.options.map((option) => {
                    return <FormControlLabel  control={<Checkbox  checked={question.answer.includes(option)} />} label={option} />
                })
            }

        </FormGroup>
    );
}