import {
  REGISTER,
  LOGIN,
  GET_INFO,
} from '../actions/type'


const initialState = {
  user: '',
  type: '',
  _id: '',
  path: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
      case REGISTER:
        return {...state, ...action.payload, path: action.payload.type === 'customer' ? '/goods' : '/order'}
      case LOGIN:
        return {...state, ...action.payload, path: action.payload.type === 'customer' ? '/goods' : '/order'}
      case GET_INFO:
        return {...state, ...action.payload, path: action.payload.type === 'customer' ? '/goods' : '/order'}
      default:
        break
  }
  return state
}