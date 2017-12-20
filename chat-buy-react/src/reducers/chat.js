import { GET_USERNAME, GET_MESSAGE } from "../actions/type";

const initialState = {
  userName: "",
  currentChatList: [],
  messageList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, userName: action.payload };
    case GET_MESSAGE:
      console.log([...state.currentChatList, action.payload]);
      return {
        ...state,
        currentChatList: [...state.currentChatList, action.payload]
      };
    default:
      return state;
  }
}
