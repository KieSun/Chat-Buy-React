import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENT_LIST,
  CLEAN_NO_READ
} from "../actions/type";
import Immutable from "seamless-immutable";

const initialState = {
  chatUserName: "",
  currentChatList: [],
  currentMessageId: "",
  messageList: Immutable([]),
  userId: "",
  noReadCount: 0
};

function sortMessageList(list) {
  return list.sort((a, b) => {
    return a.messages.last().date < b.messages.last().date;
  });
}

function changeReadId(state, readId, messageId) {
  state.messageList.find(v => {
    if (v.messageId == messageId) {
      v.bothSide.find(v => {
        if (v.user == state.userId) {
          v.lastId = readId;
        }
      });
    }
  });
  return state.messageList;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, userName: action.payload };
    case GET_MESSAGE:
      return {
        ...state,
        messageList: Immutable(action.messageList),
        noReadCount: state.noReadCount + action.isNoRead
      };
    case GET_MESSAGE_LIST:
      return {
        ...state,
        messageList: Immutable(sortMessageList(action.payload)),
        userId: action.userId
      };
    case SET_CURRENT_LIST:
      return {
        ...state,
        currentChatList: action.payload.messages,
        currentMessageId: action.payload.messageId
      };
    case CLEAN_NO_READ:
      return {
        ...state,
        messageList: changeReadId(
          state,
          action.payload.readId,
          action.payload.messageId
        )
      };
    default:
      return state;
  }
}
