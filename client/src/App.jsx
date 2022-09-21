import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import CrearBalance from './pages/CrearBalance';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<CrearBalance/>}/>
        <Route path='/edit/:id' element={<CrearBalance/>}/>
      </Routes>
    </>
  )
}

export default App
