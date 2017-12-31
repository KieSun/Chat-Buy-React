import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENT_LIST,
  CLEAN_NO_READ
} from "../actions/type";
import { Map, List } from "immutable";

const initialState = Map({
  // 当前聊天对象昵称
  chatUserName: "",
  // 当前聊天列表
  currentChatList: List([]),
  // 当前聊天 ID
  currentMessageId: "",
  // 所有消息列表
  messageList: List([]),
  // 当前用户 ID
  userId: "",
  // 未读消息总数
  noReadCount: 0,
  // 未读消息数组，对应每个消息
  noReadCounts: List([])
});

// 给消息列表按照时间顺序排序
function sortMessageList(list) {
  return list.sort((a, b) => {
    return (
      a
        .get("messages")
        .get(-1)
        .get("date") <
      b
        .get("messages")
        .get(-1)
        .get("date")
    );
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return state.merge({ userName: action.payload });
    case GET_MESSAGE:
      return state.merge({
        messageList: action.messageList,
        noReadCount: state.get("noReadCount") + action.isNoRead,
        currentChatList: action.currentChatList,
        noReadCounts: action.noReadCounts
      });
    case GET_MESSAGE_LIST:
      return state.merge({
        messageList: sortMessageList(action.payload),
        userId: action.userId,
        noReadCounts: action.noReadCounts,
        noReadCount: action.noReadCounts.reduce((sum, value) => sum + value, 0)
      });
    case SET_CURRENT_LIST:
      return state.merge({
        currentChatList: action.payload
          ? action.payload.get("messages")
          : List([]),
        currentMessageId: action.messageId
      });
    case CLEAN_NO_READ:
      return state.merge({
        noReadCounts: action.noReadCounts,
        noReadCount: state.get("noReadCount") - action.readCount
      });
    default:
      return state;
  }
}
