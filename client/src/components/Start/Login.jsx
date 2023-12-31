import React, { useState , useContext , useEffect } from 'react';
import '../../style/Initial/Login.css'
import login from '../../images/assets/undraw_maker_launch_re_rq81.svg'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify'
import { useNavigate , NavLink } from 'react-router-dom'
import ThemButton from '../ThemeChnageButton'
import { AppContext } from '../../App';
import { Theme } from '../Theme';
import logo from '../../images/AppLogo2.png'
import DeveloperInfo from './DeveloperInfo';

const Login = () => {

  const navigate = useNavigate();

  const {themeToggler} = useContext(AppContext)

  const [userData,setUserData] = useState({
    email : '',
    password : ''
  })


  const getData = async() =>{
    try {
      const res2 = await fetch('/about',{
          method:'GET',
          headers:{
              "Content-Type":"application/json"
          }
      })

          const Data = await res2.json();
          navigate('/')
      } catch (error) {
          console.log('data not found');
      }
  }

  useEffect(() => {
    getData();
  },[]);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
    // alert('res')
      const {email,password} = userData;
      const res = await fetch('/signin',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
              email,password
          })

      })

      if(res.status === 400){
        toast.error('Invalid credentials')
      }else{
        toast.success('User Login Successfully')
        navigate('/')
      }

    } catch (error) {
      console.log(error);
    }

  }


  const inputHandler = (e) =>{
    var name = e.target.name;
    var value = e.target.value;

    setUserData({...userData,[name]:value})

  }

  return <>
    <div className='login_page' style={{
      backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color
    }}>
      {/* <DeveloperInfo /> */}
      <div className='Theme_button'>
        <ThemButton />
      </div>
      <div className='login_body' style={{
        backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
        boxShadow : Theme.Dark.BoxShadow
      }}>
        <div className='Header_container'>
            <img src={logo} alt="" srcset="" style={{
              width:'50px'
            }} />
            <div>
              AI Based Student Development Application
            </div>
        </div>
            <h2>Login</h2>
        <div className='login_form'>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control bg-tp" id="email" autoFocus name='email' value={userData.email} onChange={inputHandler} required style={{
                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor,
                // boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow
              }}/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control bg-tp" id="password" name='password' value={userData.password} onChange={inputHandler} required style={{
                color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
                backgroundColor : themeToggler ? Theme.Dark.BodyBackgroundColor : Theme.Light.BodyBackgroundColor
              }}/>
            </div>
            <Button type='submit' variant="contained" style={{width:'100%'}}>LOGIN</Button>
            <NavLink to='/forgot' className='initial_link' > <Button color='primary' style={{width:'100%',marginTop:'1rem'}} >Forgot Password ?</Button> </NavLink>
          </form>
          <footer className='Log_footer'>
          <NavLink to='/register' className='initial_link'> <Button variant="outlined" style={{width:'100%'}} >Create Account</Button> </NavLink>
          </footer>
        </div>
      </div>
    </div>
  </>;
};

export default Login;
