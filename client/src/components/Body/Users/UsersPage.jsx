import React,{useEffect,useState,createContext,useContext} from 'react'
import '../../../style/Body/Users.css'
import HeaderGrid from './HeaderGrid'
import UsersList from './UsersList'

import { AppContext } from '../../../App';

import UsersSeketon from './UsersSkeleton'

export const UsersContext = createContext();
const UsersPage = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const {rootUser,setRootUser} = useContext(AppContext)
  
  
  const [rows, setRows] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [total, setTotal] = useState(' ')
  const [loader, setLoader] = useState(false)

  const getUsers = async() =>{
    try {
        setLoader(true);
          const res2 = await fetch('/about',{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })

        const user = await res2.json();
        setRootUser(user);
        
        const res = await fetch(`/usersList`,{
          method:'GET',
          headers : {
            'Content-Type' : 'application'
          }
        })

        const Data = await res.json();

        console.log(rootUser._id);

        const data = await Data.filter((e)=>{
          return e.id !== user._id;
        })

        console.log(data);

        setRows(data)
        setAllUsers(data)
        setTotal(Data.length)
        setLoader(false)

    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    getUsers()
  }, [])




  return (
    <UsersContext.Provider value={{
      rows,
      allUsers,
      setRows,
      total
    }}>
      <div className='body_margin'>

      {
        loader ? <UsersSeketon /> : <>
        <HeaderGrid/>
        <UsersList />
        </>
      }
      </div>
    </UsersContext.Provider>
  )
}

export default UsersPage