import { height } from '@mui/system'
import React from 'react'
import CodeEditor from './CodeEditor'
import MonacoEditor from './MonacoEditor'
import SelectLang from './SelectLang'
import SelectTheme from './SelectTheme'


const InputOutputUpdated = () => {
  return (
    <>    
    <div style={{
        display:'flex',
        flexDirection : 'column',
        width:'100%'
    }}>
        <div style={{
          display:'flex',
          justifyContent:'space-between'
        }}>
          <div style={{
            marginRight:'1rem'
          }}>

        <SelectLang />
          </div>
          <div>
            <SelectTheme />

          </div>
        </div>
        

        <MonacoEditor />
    </div>
    </>
  )
}

export default InputOutputUpdated