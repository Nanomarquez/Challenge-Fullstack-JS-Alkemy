import React, { useState } from 'react'
import swAlert from '@sweetalert/with-react';
import axios from 'axios';
import {useNavigate,Link,Navigate} from 'react-router-dom';
function Login() {
  const [err,setErr] = useState(false)
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const password = e.target["password"].value;
    const username = e.target["username"].value;
    sessionStorage.setItem('user',username)
    if(!password || !username){
      swAlert("Error","Los campos no pueden estar vacios","error")
      return;
    }
    axios.post('/users/login',{password,username})
    .then(res=>{
      if(res.data.error){
        swAlert('Error',res.data.error,"error")
        return;
      }
      const token = res.data.token
      const id = res.data.id
      sessionStorage.setItem('token',token)
      sessionStorage.setItem('UserId',id)
      navigate('/home')
    })
    .catch(err=>{
      console.log(err)
      setErr(true)
    })
  }

  return (
      <>
      {token && <Navigate to='/home'/> }     
    <div className='bg-gray-500 w-full h-full absolute flex justify-center items-center'>
    <div className='bg-white h-auto w-auto p-5 rounded flex items-center shadow-sm flex-col gap-2 shadow-black'>
    <div className='text-2xl font-bold p-3'>Login</div>
    <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-4 p-5'>
      <input className='bg-slate-300 p-2 m-2 rounded outline-none' type="text" name='username'/>
      <input className='bg-slate-300 p-2 m-2 rounded outline-none' type="password" name='password'/>
      <button className='p-2 m-5 bg-slate-300 rounded shadow-sm shadow-black active:shadow-inner hover:shadow-md duration-100'>Sign in</button>
    </form>
    <p className='text-xl'>No tenes cuenta? <Link className='font-bold underline' to='/'>Registrate</Link> </p>
    </div>
  </div>
      </>
  )
}

export default Login