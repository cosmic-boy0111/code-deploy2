import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import React,{useState,useEffect,useContext} from 'react'

import App, { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import { useNavigate } from 'react-router-dom'

import { Avatar , Button } from '@mui/material'
const UserCard = ({Data}) => {

  const navigate = useNavigate();

  const {themeToggler,rootUser} = useContext(AppContext)

  const [row, setRow] = useState({})
  
  const [action, setAction] = useState('Follow')

    const [img, setImg] = useState('')

    const getData = async () =>{
      try {

        const res2 = await fetch(`/getListUser/${Data.id}`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const data2 = await res2.json();
        setRow(data2);
        
      const res3 = await fetch(`/getImg/${Data.id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data3 = await res3.json();
      setImg(data3.img)

        
          const data = rootUser;

        const res = await fetch(`/getFollowersId/${Data.id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const list = await res.json();
        console.log(list)
        if(list.find(element => element === data._id) !== undefined){
          setAction('Following')
        }




      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getData()
    }, [])

    const go = () =>{
      console.log('go');
      navigate(`/profile/${Data.id}`)
    }
    


    const Follow = async() =>{
      try {
        const res = await fetch('/addFollower',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            id : row.id,
            _id : rootUser._id,
           
          })
        })
        if(res.status === 200){
          setAction('Following')
        }
      } catch (error) {
        console.log(error);
      }
    }

    const UnFollow = async() =>{
      try {
        const res = await fetch('/deleteFollower',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            id : row.id,
            _id : rootUser._id
          })
        })
        if(res.status === 200){
          setAction('Follow')
        }
      } catch (error) {
        console.log(error);
      }
    }
  

  return (
    <div>
      <div className='video_channel_card'   style={{
          backgroundColor : themeToggler ? Theme.Dark.boxColor : Theme.Light.boxColor,
          // backgroundColor:'transparent',
          boxShadow : themeToggler ? Theme.Dark.BoxShadow : Theme.Light.BoxShadow,
          // boxShadow:'none',
          border: themeToggler ? Theme.Dark.Border : Theme.Light.Border,
          textAlign:'initial',
          color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
          cursor:'pointer',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          flexWrap:'wrap'
          
      }}>
       <div className="Header_main_bottom" onClick={go} style={{
         padding:'0'
       }}>
          <div className="logo_holder">
            <div
              className="logo_img2"
              style={{
                backgroundColor: themeToggler
                  ? Theme.Dark.boxColor
                  : Theme.Light.boxColor,
              }}
            >
              <Avatar
                aria-label="recipe"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                {img === "" ? null : (
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                
              </Avatar>
            
             
            </div>
            <div className="name_role_info2">
              <h4> {row.name} </h4>
              <span> { row.profession} </span>
            </div>
          </div>
          
          
        </div>
        
      <div className='channel_action'>
                  {
                    rootUser._id === row.id ? null :
                    <Button variant='contained'  onClick={action === 'Follow' ? Follow : UnFollow} > {action} </Button> 
                  }
            
          </div>
      </div>
    </div>
  )
}

export default UserCard