import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const UserId = parseInt(sessionStorage.getItem('UserId'));
  const username = sessionStorage.getItem('user');
  const [total,setTotal] = useState(0);
  const [user, setUser] = useState("")
  const handleLogout = () =>{
    sessionStorage.clear()
    navigate('/login')
  }

  useEffect(()=>{
    axios.get('/balances',{params:{UserId}})
    .then(res=>{
      setUser(username)
      var total = 0
      res.data.map((e)=>{
        if(e.isIncome === true){
          total-=e.amount
        }
        if(e.isIncome === false){
          total+=e.amount
        }
        setTotal(total)
      }
      )
    })
  },[])


  return (
    <nav className='bg-gray-800 h-14 flex items-center justify-around text-white text-2xl z-10'>
      <ul className='flex gap-10'>
        <li className='hover:scale-105 hover:text-gray-200 duration-100'> <Link to='/create'>Crear</Link></li>
        <li className='hover:scale-105 hover:text-gray-200 duration-100'><Link to='/home'>Home</Link></li>
        <li className='hover:scale-105 hover:text-gray-200 duration-100'><button onClick={()=>handleLogout()}>Logout</button></li>
      </ul>
      <div>Bienvenido <span className='p-1 capitalize rounded mx-2 bg-white text-black'>{user}</span>Tu balance total es de: <span className={total>0?"text-green-500":"text-red-500"}>{total}</span></div>
    </nav>
  )
}

export default NavBar