import {
  GOODS_LIST,
  ADD_TO_CART,
  ERROR
} from './type'

import { Toast } from 'antd-mobile'
import axios from 'axios'

export function getGoodsInfo() {
  return async dispatch => {
    const res = await axios.get('/goods/list')
    if (res.status === 200 && res.data.code === 0) {
      dispatch({type: GOODS_LIST, payload: res.data.data})
    }
  }
}

export function addToCart({id, price, count}) {
  if (!Number.isInteger(count)) {
    return { type: ERROR  }
  } else {
    return { type: ADD_TO_CART, payload: {id, price, count: count > 99 ? 99 : count } }
  }
  
}