import {
  REGISTER,
  LOGIN
} from '../actions/type'


const initialState = {
  user: '',
  type: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
      case REGISTER:
      console.log(action.payload);
        return {...state, ...action.payload}
      case LOGIN:
        return {...state}
      default:
        break
  }
  return state
}