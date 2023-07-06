import React from 'react'
import '../../../style/Body/Compiler.css'
import SelectLang from './SelectLang'
import { Theme } from '../../Theme'
import { AppContext } from '../../../App'
import CodeEditor from './CodeEditor'
import Accordion from './Accordion'
import Button from '@mui/material/Button';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
const InputOutput = () => {

  const {themeToggler} = React.useContext(AppContext)

  return (
    <div
    className="code_holder"
    >
      <header className='ioHeader'>
        <h5>
          Program
        </h5>
        <SelectLang />
      </header>
      <section className='code_container' style={{
        backgroundColor: themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
        border: themeToggler ? Theme.Dark.Border : Theme.Light.Border
      }}>
        <CodeEditor />
      </section>
        <Accordion />
    </div>
  )
}

export default InputOutput