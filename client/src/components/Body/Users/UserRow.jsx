import React,{useContext,useState,useEffect} from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';


import { AppContext } from '../../../App';
import { Theme } from '../../Theme';

import { useNavigate } from 'react-router-dom';


const UserRow = ({
    isItemSelected,
    labelId,
    row ,
    handleClick
}) => {

    const navigate = useNavigate();
    const {themeToggler,rootUser} = useContext(AppContext)

    const goToProfile = (id) =>{
      navigate(`/profile/${id}`)
    }


    const [action, setAction] = useState('Follow')

    const [img, setImg] = useState('')

    const getFollowers = async () =>{
      try {

        
      const res3 = await fetch(`/getImg/${row.id}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      const data3 = await res3.json();
      setImg(data3.img)

        
          const Data = rootUser;

        const res = await fetch(`/getFollowersId/${row.id}`,{
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        const list = await res.json();
        console.log(list)
        if(list.find(element => element === Data._id) !== undefined){
          setAction('Following')
        }

      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getFollowers()
    }, [])
    


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
    <>
    <TableRow
    hover
    // onClick={(event) => handleClick(event, row.name)}
    role="checkbox"
    aria-checked={isItemSelected}
    tabIndex={-1}
    key={row.name}
    selected={isItemSelected}
    style={{
      color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
    }}
  >
    
    <TableCell
      component="th"
      id={labelId}
      scope="row"
      padding="none"
      onClick={()=>goToProfile(row.id)}
    >
      <span style={{
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        display:'flex',
        alignItems:'center',
        cursor:'pointer'
      }} > 
        <Avatar alt={row.name} src={img} />
        <span style={{ marginLeft:'.5rem' }}>{row.name} </span> 
      </span> 
    </TableCell>
    <TableCell align="right"> 
    { row.profession !== '' ?
        <span style={{
        color : themeToggler ? Theme.Dark.Color : Theme.Light.Color,
        // backgroundColor:'rgb(167, 152, 255)',
        border:'1px solid rgb(41, 182, 246)',
        padding:'.2rem .5rem',
        borderRadius:'20px'
      }} >{row.profession} </span>  : ``
    }
    </TableCell>
    <TableCell align="right"> <span style={{color : themeToggler ? Theme.Dark.Color : Theme.Light.Color}} > <a  href={`mailto:${row.email}`} className='email_link'>{row.email} </a>  </span> </TableCell>
    <TableCell align="right"> <span style={{color : themeToggler ? Theme.Dark.Color : Theme.Light.Color}} > 
    <Button variant='contained'  size='small' onClick={action === 'Follow' ? Follow : UnFollow} > {action} </Button> </span> </TableCell>
  </TableRow> 
    </>
  )
}

export default UserRow