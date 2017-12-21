import { GET_USERNAME, GET_MESSAGE } from "./type";
import { getOrderSuccess, affirmOrderSuccess } from "./order";

import axios from "axios";
import io from "socket.io-client";
import history from "../common/history";

let socket = "";

export function connectSocket() {
  return (dispatch, state) => {
    socket = io("http://localhost:1717");
    socket.on("connect", function() {
      socket.emit("user", state().user.id);
    });
    socket.on("affirmOrder", id => {
      dispatch(affirmOrderSuccess(id));
    });
    socket.on("getOrder", data => {
      dispatch(getOrderSuccess(data));
    });
    socket.on("userName", userName => {
      if (userName) {
        dispatch({ type: GET_USERNAME, payload: userName });
      } else {
        history.push("/chat");
      }
    });
    socket.on("message", data => {
      dispatch({ type: GET_MESSAGE, payload: data });
    });
  };
}

export function getUserName(id) {
  return dispatch => {
    socket.emit("getUserName", id);
  };
}

export function sendMessage(to, message) {
  return (dispatch, state) => {
    const id = state().user.id;
    dispatch({
      type: GET_MESSAGE,
      payload: {
        from: id,
        to,
        message
      }
    });
    socket.emit("sendMessage", { from: id, to, message });
  };
}
