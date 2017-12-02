import {
  GOODS_LIST
} from './type'

import axios from 'axios'

export function getGoodsInfo() {
  return async dispatch => {
    const res = await axios.get('/goods/list')
    if (res.status === 200 && res.data.code === 0) {
      dispatch({type: GOODS_LIST, payload: res.data.data})
    }
  }
}