// import { combineReducers } from "redux";
import { combineReducers } from "redux-immutable";
import UserReducer from "./user";
import GoodsReducer from "./goods";
import OrdersReducer from "./orders";
import ChatReducer from "./chat";
import { LOG_OUT } from "../actions/type";
import history from "../common/history";

const appReducer = combineReducers({
  user: UserReducer,
  goods: GoodsReducer,
  order: OrdersReducer,
  chat: ChatReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    history.push("/login");
    window.localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
