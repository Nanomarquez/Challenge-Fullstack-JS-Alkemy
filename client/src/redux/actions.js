import axios from 'axios';
export const GET_ALL_BALANCES = 'GET_ALL_BALANCES';
export const GET_BALANCE = 'GET_BALANCE';
export const CREATE_BALANCE = 'CREATE_BALANCE';
export const DELETE_BALANCE = 'DELETE_BALANCE';
export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export const getAllBalances = () => {
  return function (dispatch) {
    axios.get('/balances')
    .then(res=>{
      dispatch({
        type: GET_ALL_BALANCES,
        payload: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

export const getBalance = (id) =>{
  return function (dispatch) {
    axios.get(`/balances/${id}`)
    .then(res=>{
      if(res.data !== 'Record not Found'){
        dispatch({
          type: GET_BALANCE,
          payload: res.data
        })
      }
      else{
        alert(res.data)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

export const createBalance = (payload) =>{
  return function (dispatch) {
    axios.post('/balances', payload)
    .then(res=>{
      dispatch({
        type: CREATE_BALANCE,
        payload: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

export const deleteBalance = (id) =>{
  return function (dispatch) {
    axios.delete(`/balances/${id}`)
    .then( res =>{
      if(res.data !== 'Record no encontrado'){
        dispatch({
          type: DELETE_BALANCE,
          payload
        })
      }else{
        alert(res.data)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

export const updateBalance = (id) =>{
  return function (dispatch) {
    axios.put(`/balances/${id}`)
    .then(res=>{
      if(res.data !== 'Record no encontrado'){
        dispatch({
          type: UPDATE_BALANCE,
          payload: res.data
        })
      }else{
        alert(res.data)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
}