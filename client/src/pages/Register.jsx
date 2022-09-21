import React, { useState } from 'react'
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import {useNavigate,Link,Navigate} from 'react-router-dom';
function Register() {
  const [err,setErr] = useState(false);
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const username = e.target["username"].value;
    await axios.post('/users/register',{email,password,username})
    .then(res=>{
      swAlert('Success',"Registro exitoso ahora logeate",'success')
      navigate('/login')
    })
    .catch(err=>{
      console.log(err.response.data)
      setErr(true)
    })
  }
  
  return (
    <>
    {token && <Navigate to='/home'/> }      
    <div className='bg-gray-500 w-full h-full absolute flex justify-center items-center'>
    <div className='bg-white h-auto w-auto p-5 rounded flex items-center shadow-sm flex-col gap-2 shadow-black'>
    <div className='text-2xl font-bold p-3'>Register</div>
    <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-4 p-5'>
    <input className='bg-slate-300 p-2 m-2 rounded outline-none' type="text" name='username' id='username' placeholder='Username'/>
      <input className='bg-slate-300 p-2 m-2 rounded outline-none' type="email" name='email' id='email' placeholder='Email'/>
      <input className='bg-slate-300 p-2 m-2 rounded outline-none' type="password" name='password' id='password' placeholder='Password'/>
      <button className='p-2 m-5 bg-slate-300 rounded shadow-sm shadow-black active:shadow-inner hover:shadow-md duration-100'>Sign in</button>
    </form>
    <p className='text-xl'>Tenes cuenta? <Link className='underline font-bold'  to='/login'>Logeate</Link> </p>
    </div>
  </div>
      </>
  )
}

export default Register