import {
  REGISTER,
  LOGIN,
  GET_INFO,
  GET_MY_ORDERS,
  AFFIRM_ORDER
} from "../actions/type";
import { changeOrderState } from "../common/unit";
import { List } from "immutable";

const initialState = {
  user: "",
  type: "",
  _id: "",
  path: "",
  orders: List([])
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      };
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      };
    case GET_INFO:
      return {
        ...state,
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      };
    case GET_MY_ORDERS:
      return { ...state, orders: List(action.payload) };
    case AFFIRM_ORDER:
      return {
        ...state,
        orders: changeOrderState(state.orders, action.payload, 2)
      };
    default:
      break;
  }
  return state;
}
