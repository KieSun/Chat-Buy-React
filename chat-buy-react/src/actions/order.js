import {
  GET_ALL_ORDERS
} from './type'

import { Toast } from 'antd-mobile'
import axios from 'axios'
import history from '../common/history'

export function getAllOrders() {
  return async dispatch => {
    const res = await axios.get('/order/allOrders')
    if (res.status === 200 && res.data.code === 0) {
      dispatch({type: GET_ALL_ORDERS, payload: res.data.data})
    }
  }
}