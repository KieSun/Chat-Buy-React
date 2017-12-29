import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENT_LIST,
  CLEAN_NO_READ
} from "./type";
import { getOrderSuccess, affirmOrderSuccess } from "./order";
import {fromJS} from 'immutable'

import axios from "axios";
import io from "socket.io-client";
import history from "../common/history";
import { Toast } from "antd-mobile";

let socket = "";

// socket 连接
export function connectSocket() {
  return (dispatch, state) => {
    socket = io("http://localhost:1717");
    // 建立连接后发送用户 ID
    socket.on("connect", function() {
      socket.emit("user", state().get('user').get('id'));
    });
    // 接收确认订单信息
    socket.on("affirmOrder", id => {
      dispatch(affirmOrderSuccess(id));
    });
    // 接收接单信息
    socket.on("getOrder", data => {
      dispatch(getOrderSuccess(data));
    });
    // 接收聊天对象昵称
    socket.on("userName", userName => {
      if (userName) {
        dispatch({ type: GET_USERNAME, payload: userName });
      } else {
        history.push("/messageList");
      }
    });
    // 接收聊天消息
    socket.on("message", data => {
      dispatch(getMessageSuccess(data));
    });
    socket.on("serverError", msg => {
      Toast.info(msg.errorMsg, 2);
      history.push("/messageList");
    });
  };
}

// 请求聊天对象昵称
export function getUserName(id) {
  return dispatch => {
    socket.emit("getUserName", id);
  };
}

// 发送消息
export function sendMessage(to, message) {
  return (dispatch, state) => {
    const id = state().get('user').get('id');
    // 本地自建数据结构插入到数组中
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

// 获取聊天信息列表
export function getMessageList() {
  return async (dispatch, state) => {
    const res = await axios.post("/chat/getMessageList");
    if (res.status === 200 && res.data.code === 0) {
      dispatch({
        type: GET_MESSAGE_LIST,
        payload:  fromJS(res.data.data),
        userId: state().get('user').get('id')
      });
    }
  };
}

// 设置当前聊天信息列表
export function setCurrentChatList(obj) {
  return { type: "SET_CURRENT_LIST", payload: obj };
}

// 清除未读消息
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

// 获取消息成功
function getMessageSuccess(payload) {
  return (dispatch, getState) => {
    const state = getState();
    let chatUserName;
    // 判断 payload 是否为服务器数据
    if (payload.obj) {
      chatUserName = payload.name;
      payload = payload.obj;
    }
    // 获取全部消息列表
    const list = state.get('chat').get('messageList');
    // 自己生成 messageId
    const messageId = [payload.from, payload.to].sort().join("");
    // 判断消息是否为自己发送，不是就将未读消息加一
    const isNoRead = payload.from == state.get('user').get('id') ? 0 : 1;
    // 在全部消息列表中寻找是否存在当前聊天 messageId，存在就将聊天信息插入
    let index = list.findIndex(v => {
      return v.get('messageId') === messageId
    })
    let currentList = list.update(index, item => {
      return item.get('messages').push(fromJS(payload))
    })

    if (index > -1) {
      // 如果匹配了 messageId，就将消息数组插入到0索引位置
      const oldItem = currentList.get(index)
      dispatch({
        type: GET_MESSAGE,
        messageList: currentList.delete(index).insert(0, oldItem),
        isNoRead
      });
    } else {
      // 否则就自己生成一个数组插入到数组第一位
      const obj = {
        messageId,
        bothSide: [
          {
            user: payload.from,
            name: chatUserName
          },
          {
            user: payload.to,
            name: state.get('user').get('user')
          }
        ],
        messages: [payload]
      };
      dispatch({ type: GET_MESSAGE, messageList: list.unshift(fromJS(obj)), isNoRead });
    }
  };
}
