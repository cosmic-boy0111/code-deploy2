import React, { createContext, useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Body from './components/Body'
import load from './videos/rocket.mp4'
import './App.css'
import Login from './components/Start/Login'
import Register from './components/Start/Register'
import Forgot from './components/Start/Forgot'

import Waves from './components/Waves';

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import Loader from './components/Loader';


export const AppContext = createContext();

const App = () => {

  const [rootUser, setRootUser] = useState({});

  const [search, setSearch] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [searchText, setSearchText] = useState('')

  const [toggleState, setToggleState] = useState({
    right: false,
  });

  const [themeToggler, setThemeToggler] = useState(false);


  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 2000);
  }, []);


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setToggleState({ ...toggleState, [anchor]: open });
  };


  const [state2, setState2] = React.useState({
    left: false,
  });

  const toggleDrawer2 = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState2({ ...state2, [anchor]: open });
  };


  // for blog data

  const [toggle, setToggle] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [blogs, setBlogs] = useState([])


  const [blogData, setBlogData] = useState({
    id: '',
    headerTitle: '',
    file: '',
    description: ''
  })



  const [openSearch, setOpenSearch] = useState(false)




  return (
    <>
      <AppContext.Provider value={{
        toggleState,
        toggleDrawer,
        rootUser,
        setRootUser,
        toggleDrawer2,
        state2,
        themeToggler,
        setThemeToggler,
        toggle,
        setToggle,
        isEdit,
        setIsEdit,
        blogData,
        setBlogData,
        blogs,
        setBlogs,
        setSearch,
        searchText,
        setSearchText,
        searchData,
        setSearchData,
        openSearch,
        setOpenSearch
      }}>
        {
          search ? <Waves /> : null
        }

        <div style={{
          display: loader ? 'flex' : 'none'
        }}
          className='load_page'
        >
          {/* <Loader /> */}
          <video playsInline={true} preload='auto' autoPlay={true} loop={loader} muted={true} className='video' >
            <source src={load} type="video/mp4" style={{
              borderRadius: '5px'
            }} />
          </video>
        </div>
        <div style={{
          display: !loader ? 'block' : 'none'
        }}>
          <BrowserRouter>


            <Routes>
              <Route exact path='*' element={<Body />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot' element={<Forgot />} />
            </Routes>

            <ToastContainer />
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </>
  )
}

export default App
