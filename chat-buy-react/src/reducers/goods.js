import {
  GOODS_LIST
} from '../actions/type'

const initialState = {
  goodsList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
      case GOODS_LIST:
        return {...state, goodsList: action.payload}
      default:
        break
  }
  return state
}