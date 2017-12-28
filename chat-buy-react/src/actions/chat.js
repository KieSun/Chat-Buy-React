import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENLIST,
  CLEAN_NO_READ
} from "./type";
import { getOrderSuccess, affirmOrderSuccess } from "./order";

import axios from "axios";
import io from "socket.io-client";
import history from "../common/history";
import { Toast } from "antd-mobile";

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
        history.push("/messageList");
      }
    });
    socket.on("message", data => {
      dispatch(getMessageSuccess(data));
    });
    socket.on("serverError", msg => {
      Toast.info(msg.errorMsg, 2);
      history.push("/messageList");
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
    const payload = {
      from: id,
      to,
      message,
      date: Date()
    };
    dispatch(getMessageSuccess(payload));
    socket.emit("sendMessage", { from: id, to, message });
  };
}

export function getMessageList() {
  return async (dispatch, state) => {
    const res = await axios.post("/chat/getMessageList");
    if (res.status === 200 && res.data.code === 0) {
      dispatch({
        type: GET_MESSAGE_LIST,
        payload: res.data.data,
        userId: state().user.id
      });
    }
  };
}

export function setCurrentChatList(obj) {
  return { type: "SET_CURRENLIST", payload: obj };
}

export function cleanNoRead(readId, messageId) {
  return async dispatch => {
    const res = await axios.post("/chat/cleanNoRead", { readId, messageId });
    if (res.status === 200 && res.data.code === 0) {
      dispatch({
        type: CLEAN_NO_READ,
        payload: { readId, messageId }
      });
    }
  };
}

function getMessageSuccess(payload) {
  return (dispatch, getState) => {
    let oldIndex = 0;
    const state = getState();
    let chatUserName = state.chat.chatUserName;
    if (payload.obj) {
      chatUserName = payload.name;
      payload = payload.obj;
    }
    const list = state.chat.messageList.toArray();
    const messageId = [payload.from, payload.to].sort().join("");
    const isNoRead = payload.from == state.user.id ? 0 : 1;

    let currentLsit = list.find((v, index) => {
      if (v.messageId === messageId) {
        oldIndex = index;
        v.messages.push(payload);
        return v;
      }
    });
    if (currentLsit) {
      dispatch({
        type: GET_MESSAGE,
        messageList: list.move(oldIndex, 0),
        isNoRead
      });
    } else {
      const obj = {
        messageId,
        bothSide: [
          {
            user: payload.from,
            name: chatUserName
          },
          {
            user: payload.to,
            name: state.user.user
          }
        ],
        messages: [payload]
      };
      list.unshift(obj);
      dispatch({ type: GET_MESSAGE, messageList: list, isNoRead });
    }
  };
}
