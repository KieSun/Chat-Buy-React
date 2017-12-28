import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENLIST,
  CLEAN_NO_READ
} from "../actions/type";
import { List, Map } from "immutable";

const initialState = {
  chatUserName: "",
  currentChatList: [],
  currentMessageId: "",
  messageList: List([]),
  userId: "",
  noReadCount: 0
};

function sortMessageList(list) {
  return list.sort((a, b) => {
    return a.messages.last().date < b.messages.last().date;
  });
}

function changeReadId(state, readId, messageId) {
  return state.messageList.update(
    state.messageList.findIndex(v => v.messageId == messageId),
    item => {
      let index = item.bothSide.findIndex(v => v.user == state.userId);
      return Map(item.bothSide[index])
        .set("lastId", readId)
        .toObject();
    }
  );

  // return orders.update(orders.findIndex(v => v._id === id), order => {
  //   if (userId) {
  //     return Map(order)
  //       .set("state", state)
  //       .set("deliver", userId)
  //       .toObject();
  //   } else {
  //     return Map(order)
  //       .set("state", state)
  //       .toObject();
  //   }
  // });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, userName: action.payload };
    case GET_MESSAGE:
      return {
        ...state,
        messageList: List(action.messageList),
        noReadCount: state.noReadCount + action.isNoRead
      };
    case GET_MESSAGE_LIST:
      return {
        ...state,
        messageList: List(sortMessageList(action.payload)),
        userId: action.userId
      };
    case SET_CURRENLIST:
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
