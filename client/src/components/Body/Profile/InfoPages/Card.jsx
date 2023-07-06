import React, { useContext, useState, useEffect } from 'react'

import { AppContext } from '../../../../App';
import { Theme } from '../../../Theme';

import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { ProfileContext } from '../Profile';
import { useNavigate, useParams } from 'react-router-dom';



const Card = ({ user }) => {
  const navigate = useNavigate();
  const { themeToggler, rootUser } = useContext(AppContext)

  const [action, setAction] = useState('Follow')
  const [img, setImg] = useState('')

  const { followCount, setFollowCount, setSwitch } = useContext(ProfileContext)

  const { id } = useParams();

  const getFollowers = async () => {
    try {

      const res3 = await fetch(`/getImg/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data3 = await res3.json();
      setImg(data3.img)


      const res = await fetch(`/getFollowersId/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const list = await res.json();
      console.log(list)
      if (list.find(element => element === rootUser._id) !== undefined) {
        setAction('Following')
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollowers()
  }, [])



  const Follow = async () => {
    try {
      const res = await fetch('/addFollower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          _id: rootUser._id,
        })
      })
      if (res.status === 200) {
        setAction('Following')
        if (rootUser._id === id) {
          setFollowCount({
            ...followCount,
            followings: followCount.followings + 1
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const UnFollow = async () => {
    try {
      const res = await fetch('/deleteFollower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          _id: rootUser._id
        })
      })
      if (res.status === 200) {
        setAction('Follow')
        if (rootUser._id === id) {
          setFollowCount({
            ...followCount,
            followings: followCount.followings - 1
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const go = () => {
    setSwitch('Profile')
    navigate(`/profile/${user.id}`)

  }


  return (
    <div style={{
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width:'100%'
      }}>
        <div style={{
          display:'flex'
        }}>

          <Avatar alt={user.name} src={img} onClick={go} style={{
            cursor: 'pointer'
          }} />
          <div style={{ marginLeft: '.5rem', display: 'flex', flexDirection: 'column' }} >
            <span style={{ fontWeight: '500' }}> {user.name} </span>
            <span style={{
              color: themeToggler ? Theme.Dark.fadeColor : Theme.Light.fadeColor
            }} > {user.profession} </span>
          </div>
        </div>
      <div style={{
        alignSelf:'flex-end',
        marginTop:'.5rem'
      }}>

      {
        user.id === rootUser._id ? null :
        <Button variant='contained' size='small' onClick={action === 'Follow' ? Follow : UnFollow}> {action} </Button>
      }
      </div>
      </div>
    </div>
  )
}

export default Card