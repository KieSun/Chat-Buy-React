import axios from "axios";
import { Toast } from "antd-mobile";
import configureStore from "../store/configureStore";
import { logout } from "../actions/user";

const store = configureStore();

axios.interceptors.request.use(function(config) {
  Toast.loading("正在加载", 0);
  if (window.localStorage.getItem("token")) {
    config.headers["x-access-token"] = window.localStorage.getItem("token");
  }
  return config;
});

axios.interceptors.response.use(function(config) {
  Toast.hide();
  const data = config.data;
  if (data.code === 2) {
    store.dispatch(logout());
  }
  if (data.code === 1) {
    Toast.fail(data.msg, 1);
  }
  return config;
});
