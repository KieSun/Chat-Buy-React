import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENLIST
} from "../actions/type";

const initialState = {
  chatUserName: "",
  currentChatList: [],
  currentMessageId: "",
  messageList: [],
  userId: "",
  noReadCount: 0
};

function sortMessageList(list) {
  return list.sort((a, b) => {
    return a.messages.last().date < b.messages.last().date;
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, userName: action.payload };
    case GET_MESSAGE:
      return {
        ...state,
        messageList: action.messageList,
        noReadCount: state.noReadCount + action.isNoRead
      };
    case GET_MESSAGE_LIST:
      return {
        ...state,
        messageList: sortMessageList(action.payload),
        userId: action.userId
      };
    case SET_CURRENLIST:
      return {
        ...state,
        currentChatList: action.payload.messages,
        currentMessageId: action.payload.messageId
      };
    default:
      return state;
  }
}
