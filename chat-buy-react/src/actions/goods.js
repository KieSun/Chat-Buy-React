import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "./type";

import { Toast } from "antd-mobile";
import axios from "axios";

export function getGoodsInfo() {
  return async dispatch => {
    const res = await axios.get("/goods/list");
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: GOODS_LIST, payload: res.data.data });
    }
  };
}

export function addToCart({ id, price, count }) {
  if (!Number.isInteger(count)) {
    count = 0;
  }
  if (count > 99) {
    count = 99;
  }
  if (count < 0) {
    count = 0;
  }

  return { type: ADD_TO_CART, payload: { id, price, count: count } };
}

export function buy() {
  return async (dispatch, state) => {
    console.log();
    const res = await axios.post("/goods/buy", {
      buyList: state().goods.shopCart
    });
    if (res.status === 200 && res.data.code === 0) {
      Toast.success("购买成功", 1);
      dispatch({ type: BUY_SUCCESS });
    }
  };
}
