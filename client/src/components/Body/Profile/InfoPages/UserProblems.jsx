import React, { useContext, useState, useEffect } from 'react'

import { AppContext } from '../../../../App'
import { Theme } from '../../../Theme'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { ProfileContext } from '../Profile';
import empty from '../../../../images/assets/alien.svg'

import { useParams } from 'react-router-dom';

import Problem from './Problem';
import ProblemSkeleton from './InfoSkeleton/ProblemSkeleton';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserProblems = () => {

  const { themeToggler } = useContext(AppContext)
  const [problems, setProblems] = useState([])

  const { id } = useParams();

  const [loader, setLoader] = useState(false)

  const getProblem = async () => {
    try {
      setLoader(true);
      const res = await fetch(`/getUserProblems/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setProblems(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProblem();
  }, [])


  return (
    <Item className='card_container' style={{
      color: themeToggler ? Theme.Dark.Color : Theme.Light.Color,
      boxShadow: 'none',
      backgroundColor: 'transparent',
     
    }}>
      

        {
          loader ? [1, 2, 3].map((e) => {
            return  <div style={{
              width:'100%',
              display: 'flex',
              flexDirection:'column',
              alignItems:'center'
            }}>

               <ProblemSkeleton />
            </div>
          }) : problems.length === 0 ? <div className='empty_container' style={{
            padding: '1rem'
          }}>
            <h4> No Problems Yet </h4>
            <img src={empty} alt="" srcset="" className='empty_img' />
          </div> : <  >
            {
              problems.map((e, index) => {
                return <div style={{
                  width:'100%',
                  display: 'flex',
                  flexDirection:'column',
                  alignItems:'center'
                }}>
                  <Problem problem={e.problem} index={index} />
                </div>
              })
            }
          </>

        }



    </Item>
  )
}

export default UserProblems