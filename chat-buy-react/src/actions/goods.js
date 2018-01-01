import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "./type";
import { Toast } from "antd-mobile";
import axios from "axios";
import { fromJS } from "immutable";

// 获取商品列表
export function getGoodsInfo() {
  return async dispatch => {
    try {
      const res = await axios.get("/goods/list");
      if (res.status === 200 && res.data.code === 0) {
        dispatch({ type: GOODS_LIST, payload: fromJS(res.data.data) });
      }
    } catch (error) {
      console.log(error)
    }
  };
}

// 添加商品到购物车
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

  return { type: ADD_TO_CART, payload: { id, price, count } };
}

// 购买
export function buy() {
  return async (dispatch, state) => {
    try {
      const res = await axios.post("/goods/buy", {
        buyList: state()
          .get("goods")
          .get("shopCart")
          .toJS()
      });
      if (res.status === 200 && res.data.code === 0) {
        Toast.success("购买成功", 1);
        dispatch({ type: BUY_SUCCESS });
      }
    } catch (error) {
      console.log(error)
    }
  };
}
