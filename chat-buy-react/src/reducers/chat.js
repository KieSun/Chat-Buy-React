import {
  GET_USERNAME,
  GET_MESSAGE,
  GET_MESSAGE_LIST,
  SET_CURRENT_LIST,
  CLEAN_NO_READ
} from "../actions/type";
import {Map, List} from 'immutable'

const initialState = Map({
  chatUserName: "",
  currentChatList: List([]),
  currentMessageId: "",
  messageList: List([]),
  userId: "",
  noReadCount: 0
});

function sortMessageList(list) {
  return list.sort((a, b) => {
    return a.get('messages').get(-1).get('date') < b.get('messages').get(-1).get('date');
  });
}

// function changeReadId(state, readId, messageId) {
//   state.messageList.find(v => {
//     if (v.messageId == messageId) {
//       v.bothSide.find(v => {
//         if (v.user == state.userId) {
//           v.lastId = readId;
//         }
//       });
//     }
//   });
//   return state.messageList;
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return state.merge({userName: action.payload})
    case GET_MESSAGE:
      return state.merge({messageList: action.messageList, noReadCount: state.get('noReadCount') + action.isNoRead})
    case GET_MESSAGE_LIST:
      return state.merge({messageList: sortMessageList(action.payload), userId: action.userId})
    case SET_CURRENT_LIST:
      return state.merge({currentChatList: action.payload.get('messages'), currentMessageId: action.payload.get('messageId')})
    // case CLEAN_NO_READ:
    //   return {
    //     ...state,
    //     messageList: changeReadId(
    //       state,
    //       action.payload.readId,
    //       action.payload.messageId
    //     )
    //   };
    default:
      return state;
  }
}
