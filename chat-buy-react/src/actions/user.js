import {
  REGISTER
} from './type'

import axios from 'axios'

export function regiser({user, pwd, type}) {
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        console.log(res.data)
      })
  }
}

export function login({user, pwd}) {
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        console.log(res.data)
      })
  }
}