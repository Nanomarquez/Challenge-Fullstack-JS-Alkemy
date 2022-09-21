import {
  GET_ALL_BALANCES,
  GET_BALANCE,
  CREATE_BALANCE,
  DELETE_BALANCE,
  UPDATE_BALANCE
} from './actions';

const initialState = {
  balances: [],
  oneBalance: []
};

function rootReducer ( state = initialState, {payload,type}){
  switch(type){
    case GET_ALL_BALANCES:
      return {
        ...state,
        balances: payload
      };
    case GET_BALANCE:
      return {
        ...state,
        oneBalance: payload
      };
    case CREATE_BALANCE:
      return {
        ...state,
        balances: [
          ...state.balances,
          payload
        ],
      };
    case DELETE_BALANCE:
      return {
        ...state,
        balances: state.balances.filter((e)=>e.id !== payload),
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        balances: payload
      };
      default:
        return state;
  }
}

export default rootReducer;