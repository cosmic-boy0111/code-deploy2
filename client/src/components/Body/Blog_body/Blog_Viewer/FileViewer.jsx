import { CardMedia } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { checkFile } from '../../../Shared/Functions';
import Card from '../BlogContainer'

const FileViewer = () => {

    const {id} = useParams();

    const [blog, setBlog] = useState('')

    const getBlog = async() =>{
        try {
            const res = await fetch(`/getBlog/${id}`,{
                method:'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await res.json();
            console.log(data);
            setBlog(data)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getBlog();
    }, [])
    

  return (
      <>
       <Card blog={blog} isWidth={true} isEdit={false} isExtra={true} isRad={true}/>
    </>
  )
}

export default FileViewer