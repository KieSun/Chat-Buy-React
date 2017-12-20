import { GET_USERNAME } from "../actions/type";

const initialState = {
  userName: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
}
