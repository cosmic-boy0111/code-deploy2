import React,{useContext,useState,useEffect} from 'react'
import { Theme } from '../../../Theme'
import { AppContext } from '../../../../App';
import { CompilerContext } from "../Compiler";
import { height } from '@mui/system';
import { IconButton } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const Input = () => {

  const {themeToggler} = useContext(AppContext)
  const {input,setInput,problem,closeConsole} = useContext(CompilerContext)
  

  return (
    <div>
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <h6>

        Test Case 
        </h6>
        <IconButton color="secondary" onClick={closeConsole} size="small">
          <ClearRoundedIcon />
        </IconButton>

      </div>
      <div >
        <textarea class="form-control code_input_textarea" id="exampleFormControlTextarea1" rows="5" 
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        style={{
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor ,
          color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
          resize:'none',
        }}></textarea>
      </div>
    </div>
  )
}

export default Input