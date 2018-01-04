import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  // SET_CURRENT_LIST,
  CLEAN_NO_READ
} from "./type";
import { getOrderSuccess, affirmOrderSuccess } from "./order";
import { fromJS } from "immutable";
import { filterNoReadCount } from "../common/unit";

import axios from "axios";
import io from "socket.io-client";
import history from "../common/history";
import { Toast } from "antd-mobile";

let socket = "";

// socket 连接
export function connectSocket() {
  return (dispatch, state) => {
    const orders = state()
      .get("user")
      .get("orders");
    socket = io("http://localhost:1717");
    // 建立连接后发送用户 ID
    socket.on("connect", function() {
      socket.emit(
        "user",
        state()
          .get("user")
          .get("id")
      );
    });
    // 接收确认订单信息
    socket.on("affirmOrder", id => {
      if (!orders.isEmpty()) {
        dispatch(affirmOrderSuccess(id));
      }
    });
    // 接收接单信息
    socket.on("getOrder", data => {
      if (!orders.isEmpty()) {
        dispatch(getOrderSuccess(data));
      }
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
      console.log(data);
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
    const id = state()
      .get("user")
      .get("id");
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
    try {
      const res = await axios.post("/chat/getMessageList");
      if (res.status === 200 && res.data.code === 0) {
        const id = state()
          .get("user")
          .get("id");
        const data = fromJS(res.data.data);
        dispatch({
          type: GET_MESSAGE_LIST,
          payload: data,
          userId: id,
          noReadCounts: fromJS(filterNoReadCount(id, data))
        });
      }
    } catch (error) {
      console.log(error)
    }
  };
}

// 设置当前聊天信息列表
export function setCurrentChatList(obj, messageId) {
  return { type: "SET_CURRENT_LIST", payload: obj, messageId };
}

// 清除未读消息
export function cleanNoRead(readId, messageId) {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post("/chat/cleanNoRead", { readId, messageId });
      if (res.status === 200 && res.data.code === 0) {
        const chat = getState().get("chat");
        console.log(chat.get("messageList"));
        const index = chat
          .get("messageList")
          .findIndex(v => v.get("messageId") === messageId);
        const noReadCounts = chat.get("noReadCounts");
        const readCount = noReadCounts.get(index);
        dispatch({
          type: CLEAN_NO_READ,
          noReadCounts: chat.get("noReadCounts").set(index, 0),
          readCount
        });
      }
    } catch (error) {
      console.log(error)
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
    const list = state.get("chat").get("messageList");
    // 自己生成 messageId
    const messageId = [payload.from, payload.to].sort().join("");
    // 判断消息是否为自己发送，不是就将未读消息加一
    const isNoRead = payload.from === state.get("user").get("id") ? 0 : 1;
    // 在全部消息列表中寻找是否存在当前聊天 messageId，存在就将聊天信息插入
    let index = list.findIndex(v => {
      return v.get("messageId") === messageId;
    });
    // 获取当前未读消息数组
    const noReadCounts = state.get("chat").get("noReadCounts");
    // 如果该对话已存在
    if (index > -1) {
      // 更新消息列表
      let currentList = list.update(index, item => {
        let oldItem = item.get("messages");
        oldItem = oldItem.push(fromJS(payload));
        return item.set("messages", oldItem);
      });
      // 获取当前聊天列表
      const currentChatList = currentList.find(
        v => v.get("messageId") === messageId
      );
      // 将接收到的消息数组插入到 0
      const oldItem = currentList.get(index);
      currentList = currentList.delete(index).insert(0, oldItem);
      dispatch({
        type: GET_MESSAGE,
        messageList: currentList,
        isNoRead,
        noReadCounts: noReadCounts.set(
          index,
          noReadCounts.get(index) + isNoRead
        ),
        currentChatList: currentChatList
          ? currentChatList.get("messages")
          : state.get("chat").get("currentChatList")
      });
    } else {
      // 否则就自己生成一个数组插入到 0
      const obj = {
        messageId,
        bothSide: [
          {
            user: payload.from,
            name: chatUserName
          },
          {
            user: payload.to,
            name: state.get("user").get("user")
          }
        ],
        messages: [payload]
      };
      // 如果双方从未有聊天记录并且正在聊天，需要改变当前聊天列表数据
      let currentChatList = state.get("chat").get("currentChatList");
      if (messageId === state.get("chat").get("currentMessageId")) {
        currentChatList = currentChatList.set(0, fromJS(payload));
      }
      dispatch({
        type: GET_MESSAGE,
        messageList: list.unshift(fromJS(obj)),
        isNoRead,
        noReadCounts: noReadCounts.unshift(isNoRead),
        currentChatList: currentChatList
      });
    }
  };
}
