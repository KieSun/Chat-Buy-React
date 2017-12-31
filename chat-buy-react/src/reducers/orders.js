import { GET_ALL_ORDERS } from "../actions/type";
import { Map, List } from "immutable";

const initialState = Map({
  allOrders: List([])
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return state.set("allOrders", action.payload);
    default:
      break;
  }
  return state;
}
