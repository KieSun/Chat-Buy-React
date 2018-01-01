import { GET_ALL_ORDERS, AFFIRM_ORDER, GET_ORDER_SUCCESS } from "./type";

import { Toast } from "antd-mobile";
import axios from "axios";
import history from "../common/history";
import { fromJS } from "immutable";

export function getAllOrders() {
  return async dispatch => {
    try {
      const res = await axios.get("/order/allOrders");
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: GET_ALL_ORDERS, payload: fromJS(res.data.data) });
      }
    } catch (error) {
      console.log(error)
    }
  };
}

export function getOrderSuccess(data) {
  return { type: GET_ORDER_SUCCESS, payload: data };
}

export function affirmOrderSuccess(id) {
  return { type: AFFIRM_ORDER, payload: id };
}

export function getOrder(orderId) {
  return async dispatch => {
    try {
      const res = await axios.post("/order/getOrder", { orderId });
      if (res.status === 200 && res.data.code === 0) {
        history.push("/me/orders");
        Toast.success("接单成功", 1);
      }
    } catch (error) {
      console.log(error)
    }
  };
}

export function affirmOrder(orderId) {
  return async dispatch => {
    try {
      const res = await axios.post("/order/affirm", { orderId });
      if (res.status === 200 && res.data.code === 0) {
        Toast.success("确认订单成功", 1);
        dispatch(affirmOrderSuccess(orderId));
      }
    } catch (error) {
      console.log(error)
    }
  };
}
