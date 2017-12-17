// import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "./type";
import { getOrderSuccess, affirmOrderSuccess } from "./order";

import axios from "axios";
import io from "socket.io-client";

export function connectSocket() {
  return (dispatch, state) => {
    const socket = io("http://localhost:1717");
    socket.on("open", () => {
      socket.emit("user", state().user.id);
    });
    socket.on("affirmOrder", id => {
      dispatch(affirmOrderSuccess(id));
    });
    socket.on("getOrder", id => {
      dispatch(getOrderSuccess(id));
    });
  };
}
