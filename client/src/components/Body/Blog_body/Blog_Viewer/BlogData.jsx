import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser';


const BlogData = () => {
    const [blog, setBlog] = useState({})
    const {id} = useParams();

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
    <div>
        <h3>{blog.headerTitle}</h3>
        <div>
            { blog.description === undefined ? null :  parse(blog.description)}
        </div>
    </div>
  )
}

export default BlogData
