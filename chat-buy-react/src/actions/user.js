import { REGISTER, LOGIN, GET_INFO, LOG_OUT, GET_MY_ORDERS } from "./type";

import { Toast } from "antd-mobile";
import axios from "axios";
import history from "../common/history";

function regiserSuccess(data) {
  return { type: REGISTER, payload: data };
}

function loginSuccess(data) {
  return { type: LOGIN, payload: data };
}

function getInfoSuccess(data) {
  return { type: GET_INFO, payload: data };
}

function pushHome() {
  history.push("/");
}

function setToken(token) {
  window.localStorage.setItem("token", token);
}

function clearToken() {
  window.localStorage.setItem("token", "");
}

export function regitser({ user, pwd, type }) {
  return async dispatch => {
    if (!user || !pwd) {
      Toast.fail("请输入帐号密码", 1);
      return;
    } else {
      clearToken();
      const res = await axios.post("/user/register", { user, pwd, type });
      if (res.status === 200 && res.data.code === 0) {
        dispatch(regiserSuccess(res.data.data));
        setToken(res.data.token);
        pushHome();
      }
    }
  };
}

export function login({ user, pwd }) {
  return async dispatch => {
    if (!user || !pwd) {
      Toast.fail("请输入帐号密码", 1);
    } else {
      clearToken();
      const res = await axios.post("/user/login", { user, pwd });
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
        setToken(res.data.token);
        pushHome();
      }
    }
  };
}

export function getInfo() {
  return async dispatch => {
    const res = await axios.post("/user/info");
    if (res.status === 200 && res.data.code === 0) {
      dispatch(getInfoSuccess(res.data.data));
    }
  };
}

export function getMyOrders() {
  return async dispatch => {
    const res = await axios.post("/user/orders");
    if (res.status === 200 && res.data.code === 0) {
      dispatch({ type: GET_MY_ORDERS, payload: res.data.data });
    }
  };
}

export function logout() {
  return { type: LOG_OUT };
}
