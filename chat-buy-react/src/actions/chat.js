import { GET_USERNAME } from "./type";
import { getOrderSuccess, affirmOrderSuccess } from "./order";

import axios from "axios";
import io from "socket.io-client";
import history from "../common/history";

let socket = "";
if (!socket) {
  socket = io("http://localhost:1717");
}

export function connectSocket() {
  return (dispatch, state) => {
    socket.on("open", () => {
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
  };
}

export function getUserName(id) {
  return dispatch => {
    socket.emit("getUserName", id);
  };
}
