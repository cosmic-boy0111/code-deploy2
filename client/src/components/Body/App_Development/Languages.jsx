import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import LangHeader from './LangHeader'

const Languages = () => {

  
  useEffect(() => {
    var myDiv = document.getElementsByClassName('Body_container')[0];
    myDiv.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
        <LangHeader />
    </>
  )
}

export default Languages