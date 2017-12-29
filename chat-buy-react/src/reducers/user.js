import {
  REGISTER,
  LOGIN,
  GET_INFO,
  GET_MY_ORDERS,
  AFFIRM_ORDER,
  GET_ORDER_SUCCESS
} from "../actions/type";
import { List, Map } from "immutable";

function changeOrderState(orders, id, state, userId) {
  return orders.update(orders.findIndex(v => v.get('_id') === id), order => {
    if (userId) {
      return order
        .set("state", state)
        .set("deliver", userId)
    } else {
      return order
        .set("state", state)
    }
  });
}

const initialState = Map({
  user: "",
  type: "",
  id: "",
  path: "",
  orders: List([])
});

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state.merge({...action.payload, path: action.payload.type === "customer" ? "/goods" : "/allOrders"})
    case LOGIN:
      console.log(state.merge({...action.payload, path: action.payload.type === "customer" ? "/goods" : "/allOrders"}))
      return state.merge({...action.payload, path: action.payload.type === "customer" ? "/goods" : "/allOrders"})
    case GET_INFO:
      return state.merge({...action.payload, path: action.payload.type === "customer" ? "/goods" : "/allOrders"})
    case GET_MY_ORDERS:
      return state.set('orders', action.payload)
    case AFFIRM_ORDER:
      return state.set('orders', changeOrderState(state.get('orders'), action.payload, 2))
    case GET_ORDER_SUCCESS:
      console.log(state.set('orders', changeOrderState(
        state.get('orders'),
        action.payload.orderId,
        1,
        action.payload.id
      )))
      return state.set('orders', changeOrderState(
        state.get('orders'),
        action.payload.orderId,
        1,
        action.payload.id
      ))
    default:
      break;
  }
  return state;
}
