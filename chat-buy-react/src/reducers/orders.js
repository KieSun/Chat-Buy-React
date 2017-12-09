import {
  GET_ALL_ORDERS
} from '../actions/type'

const initialState = {
  allOrders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
      case GET_ALL_ORDERS:
        return {...state, allOrders: action.payload}
      default:
        break
  }
  return state
}