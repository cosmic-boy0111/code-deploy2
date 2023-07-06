import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Card  from './BlogContainer'
const SharedPost = () => {

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
      <div className='blog_body'>
        {
            blog === '' ? `` : <Card blog={blog} isShare={true}/>
        }
    </div>
  )
}

export default SharedPost