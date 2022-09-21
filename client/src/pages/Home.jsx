import React, { useState } from 'react'
import { Navigate, Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
function Home() {

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const UserId = parseInt(sessionStorage.getItem('UserId'));
  const [err,setErr] = useState(false)
  const [balances,setBalances] = useState([])

  useEffect(()=>{
    axios.get('/balances',{params:{UserId}})
    .then(res=>{setBalances(res.data)})
    .catch(err=>{
      console.log(err)
      setErr(true)
    })
  },[])

  const handleDelete = (id,detail) =>{
    axios.delete('/balances',{params:{id}})
    .then(res=>{
      window.location.reload();
    })
    .catch(err=>{
      console.log(err)
    })
  }


  return (
    <>
    <NavBar/>
    {!token && <Navigate to='/login'/> }
    <div className='bg-gray-500 w-full h-[91%] gap-2 absolute grid grid-cols-5'>
    {balances.length > 0 ? balances?.map((e)=>(
      <div key={e.id} className='p-5 text-center cursor-default bg-white m-5 h-max w-min rounded shadow-md shadow-black hover:scale-110 duration-100'>
        <p>{e.detail}</p>
        <p className={e.isIncome?"text-red-500":"text-green-500"}>{e.isIncome?"-":""}${e.amount}</p>
        <p>{e.category}</p>
        <button className='p-1 my-2 bg-red-600 rounded hover:text-white hover:shadow-lg shadow-black' onClick={()=>handleDelete(e.id,e.detail)}>Delete</button>
        <button className='p-1 my-2 bg-blue-300 rounded hover:text-white hover:shadow-lg shadow-black' onClick={()=>{navigate(`/edit/${e.id}`)}} >Modificar</button>     
      </div>
    )) : <div className='h-full text-white absolute flex flex-col justify-center w-screen items-center text-2xl gap-5'>No hay balances que mostrar <Link className='p-2 bg-white text-black rounded' to='/create'>Crear Balance</Link> </div> }
    </div>
    </>
  )
}

export default Home