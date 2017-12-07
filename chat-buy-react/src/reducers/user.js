import {
  REGISTER,
  LOGIN,
  GET_INFO,
  GET_MY_ORDERS
} from '../actions/type'

const initialState = {
  user: '',
  type: '',
  _id: '',
  path: '',
  orders: []
};

export default function (state = initialState, action) {
  switch (action.type) {
      case REGISTER:
        return {...state, ...action.payload, path: action.payload.type === 'customer' ? '/goods' : '/order'}
      case LOGIN:
        return {...state, ...action.payload, path: action.payload.type === 'customer' ? '/goods' : '/order'}
      case GET_INFO:
        return {...state, ...action.payload, path: action.payload.type === 'customer' ? '/goods' : '/order'}
      case GET_MY_ORDERS:
        return {...state, orders: action.payload}
      default:
        break
  }
  return state
}