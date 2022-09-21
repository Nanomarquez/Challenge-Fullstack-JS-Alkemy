import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Navigate,useParams} from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';

function CrearBalance() {

  const params = useParams();

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const UserId = parseInt(sessionStorage.getItem('UserId'));
  const putSubmit = async (e) =>{
    e.preventDefault();
    const detail = e.target["detail"].value;
    const amount = e.target["amount"].value;
    const category = e.target["category"].value;
    const isIncome = e.target["isIncome"].value;
    await axios.put(`/balances/${params.id}`,{detail,amount,category,isIncome})
    .then(res=>{
      swAlert("Success",`${detail} Agregado correctamente`,'success')
      navigate('/home')
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const [data,setData] = useState({})

  useEffect(()=>{
    if(params.id){
      axios.get(`/balances/${params.id}`)
      .then(res=>{setData(res.data)}).catch(err=>console.log(err))
    }
  },[])


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const detail = e.target["detail"].value;
    const amount = e.target["amount"].value;
    const category = e.target["category"].value;
    const isIncome = e.target["isIncome"].value;
    await axios.post('/balances',{detail,amount,category,isIncome,UserId})
    .then(res=>{
      swAlert("Success",`${res.data.detail} Agregado correctamente`,'success')
      navigate('/home')
    })
    .catch(err=>{
      console.log(err)
    })
  }


  return (
    <>
    {!token && <Navigate to='/home'/> }
    <NavBar/>    
    <form className='h-full -translate-y-14 bg-gray-500 -z-10 absolute flex flex-col justify-center w-screen items-center gap-2 text-black' onSubmit={params.id? (e)=>putSubmit(e) : (e)=>handleSubmit(e)}>
      <label className='text-xl text-white'>Detalle</label>
      <input className='outline-none p-2 rounded' defaultValue={data?data.detail:""} type="text" name='detail' placeholder='Detalle'/>

      <label className='text-xl text-white'>Monto</label>
      <input className='outline-none p-2 rounded' defaultValue={data?data.amount:""} type="number" name='amount' placeholder='Monto'/>

      <label className='text-xl text-white'>Category</label>
      <select className='outline-none p-2 rounded' name="category">
        <option value="Expensas">Expensas</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Osio">Osio</option>
        <option value="Transporte">Transporte</option>
      </select>

      <label className='text-xl text-white'>Pagar/Cobrar</label>
      <select className='outline-none p-2 rounded' name="isIncome">
        <option value="true">Pagar</option>
        <option value="false">Cobrar</option>
      </select>
      <button className='mt-5 hover:bg-green-600 hover:shadow-sm shadow-black duration-75 py-3 px-10 rounded bg-green-400 text-white'>{params.id ? "Modificar" : "Crear"}</button>
    </form>
    </>
  )
}

export default CrearBalance