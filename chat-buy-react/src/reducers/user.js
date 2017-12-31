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
  return orders.update(orders.findIndex(v => v.get("_id") === id), order => {
    // 如果该订单被接单，需要手动加上外卖员的 ID 用以聊天
    if (userId) {
      return order.set("state", state).set("deliver", userId);
    } else {
      return order.set("state", state);
    }
  });
}

const initialState = Map({
  // 用户名
  user: "",
  // 用户类型
  type: "",
  // 用户 ID
  id: "",
  // 用户可以跳转的路由
  path: "",
  // 我的所有订单
  orders: List([])
});

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state.merge({
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      });
    case LOGIN:
      console.log(
        state.merge({
          ...action.payload,
          path: action.payload.type === "customer" ? "/goods" : "/allOrders"
        })
      );
      return state.merge({
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      });
    case GET_INFO:
      return state.merge({
        ...action.payload,
        path: action.payload.type === "customer" ? "/goods" : "/allOrders"
      });
    case GET_MY_ORDERS:
      return state.set("orders", action.payload);
    case AFFIRM_ORDER:
      return state.set(
        "orders",
        changeOrderState(state.get("orders"), action.payload, 2)
      );
    case GET_ORDER_SUCCESS:
      return state.set(
        "orders",
        changeOrderState(
          state.get("orders"),
          action.payload.orderId,
          1,
          action.payload.id
        )
      );
    default:
      break;
  }
  return state;
}
