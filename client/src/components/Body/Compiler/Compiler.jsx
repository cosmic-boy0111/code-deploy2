import React, { useEffect, useState, useContext, createContext } from 'react'
import Grid from '@mui/material/Grid';
import { AppContext } from '../../../App';
import { Theme } from '../../Theme';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom'
import Problem from './Problem'
import InputOutput from './InputOutput';
import '../../../style/Body/Compiler.css'

import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import InputOutputUpdated from './InputOutputUpdated';
import ActionButtons from './ActionButtons';
import Input from './Actions/Input';
import Run from './Actions/Run';
import Submit from './Actions/Submit';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const CompilerContext = createContext()
const Compiler = () => {



  useEffect(() => {
    window.scroll(0, 0)
  }, [])




  const { title, id } = useParams();
  const { themeToggler, rootUser, setRootUser } = useContext(AppContext)
  const [problem, setProblem] = useState({})
  const [selectLang, setSelectLang] = useState('Cpp')

  const [theme, setTheme] = useState('light')

  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  const [run, setRun] = useState(false)
  const [upload, setUpload] = useState(false)
  const [action, setAction] = React.useState(null)
  const [isUpload, setIsUpload] = React.useState(true)
  const [mini, setMini] = useState(false)

  const [checker, setChecker] = useState([])
  const [open, setOpen] = useState(false);






  const getProblem = async () => {
    try {

      const res = await fetch(`/getProblemById/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })

      const data = await res.json();

      console.log(data);
      setProblem(data)

      data.testCases.every(function (element, index) {
        if (input !== '') {
          return false;
        }
        // Do your thing, then:
        if (element.input !== '' && element.output !== '') {
          setInput(element.input)
          return false
        }
        else return true
      })



    } catch (error) {
      console.log(error);
    }
  }


  const [value, updateValue] = useState('');



  useEffect(() => {
    getProblem();

  }, [])



  // useEffect(() => {

  //   getSolution();

  // }, [selectLang])


   

  const openConsole = () => {
    setSizes2([320, 'auto'])
    setOpen(true);
  }

  const closeConsole = () =>{
      setAction(null)
      setSizes2([520, 'auto'])
      setOpen(false);
  }

  const [sizes, setSizes] = useState([
    '40%',
    'auto',
  ]);
  const [sizes2, setSizes2] = useState([
    520,
    'auto',
  ]);


  return (
    <>

      <CompilerContext.Provider value={{
        selectLang,
        setSelectLang,
        code,
        setCode,
        input,
        setInput,
        run,
        setRun,
        action,
        setAction,
        problem,
        upload,
        setUpload,
        checker,
        setChecker,
        setMini,
        mini,
        value,
        updateValue,
        theme,
        setTheme,
        sizes2,
        setSizes2,
        isUpload,
        setIsUpload,
        open,
        setOpen,
        openConsole,
        closeConsole
      }}>
        <div style={{
          height: "90vh",
          top: '1px',
          width: '100%',
          position: 'relative',
          top: '0',
          color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          fontSize: '14px',
          marginTop: '2rem'
        }}>
          <SplitPane
            split='vertical'
            sizes={sizes}
            onChange={setSizes}
            sashClassName="resizer"
          >
            <div className='panel_css' style={{
              marginRight: '.3rem',
              backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
            }}>
              <Problem />
            </div>

            <SplitPane
              split='horizontal'
              sizes={sizes2}
              onChange={setSizes2}
              sashClassName="resizer"
            >


              <div className='panel_css' style={{
                marginLeft: '.3rem',
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                height: '100%',
                width: '100%',
              }}>

                <InputOutputUpdated />



              </div>
              <div className='panel_css' style={{
                marginTop: '.3rem',
                marginLeft: '.3rem',
                backgroundColor: themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
              }}>
                <div>
                  {
                    action === null ? null : (
                      action === 'Console' ? <Input /> : (
                        action === 'Run' ? <Run /> : (
                          action === 'Submit' ? <Submit setIsUpload={setIsUpload} /> : ``
                        )
                      )
                    )
                  }
                </div>
                <ActionButtons />
              </div>
            </SplitPane>
          </SplitPane>
        </div>
        {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
            <Grid item xs={ mini ? 4 : 6} style={{
              position:'relative',
              transition:'all .5s ease'
            }} >
              <Item className='card_container'
              style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      textAlign:'initial',
                      backgroundColor:'transparent',
                      boxShadow:'none',
                      border:'none'
                  }}
              >
                <Problem />
                
              </Item>
            </Grid>
            <Grid item xs={mini ? 8 : 6}  style={{
              position:'relative',
              transition:'all .5s ease'
            }}>
              <Item className='card_container' style={{
                      backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
                      boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
                      border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
                      textAlign:'initial',
                      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
                  }}>
                  <InputOutput />
              </Item>
            </Grid>
          </Grid>
        </Box> */}
      </CompilerContext.Provider>
    </>
  )
}

export default Compiler