import {
  REGISTER,
  LOGIN,
  GET_INFO,
  LOG_OUT
} from './type'

import axios from 'axios'
import history from '../common/history'

function regiserSuccess(data) {
  return { type: REGISTER, payload: data }
}

function loginSuccess(data) {
  return { type: LOGIN, payload: data }
}

function getInfoSuccess(data) {
  return { type: GET_INFO, payload: data }
}

function pushHome() {
  history.push('/')
}

function setToken(token) {
  window.localStorage.setItem('token', token)
}

function clearToken() {
  window.localStorage.setItem('token', '')
}

export function regiser({user, pwd, type}) {
  return dispatch => {
    clearToken()
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(regiserSuccess(res.data.data))
          setToken(res.data.token)
          pushHome()
        }
      })
  }
}

export function login({user, pwd}) {
  return dispatch => {
    clearToken()
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(loginSuccess(res.data.data))
          setToken(res.data.token)
          pushHome()
        }
      })
  }
}

export function getInfo() {
  return dispatch => {
    axios.post('/user/info')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getInfoSuccess(res.data.doc))
        }
      })
  }
}

export function logout() {
  return {type: LOG_OUT}
}