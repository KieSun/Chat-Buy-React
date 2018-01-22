/* eslint-disable import/first */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { REGISTER, LOGIN, GET_INFO, LOG_OUT, GET_MY_ORDERS } from "./type";
import { Toast } from "antd-mobile";
import axios from "axios";
import history from "../common/history";
import { connectSocket } from "./chat";
import { fromJS } from "immutable";
function setToken(token) {
    window.localStorage.setItem("token", token);
    history.push("/");
}
export function register({ user, pwd, type }) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        if (!user || !pwd) {
            Toast.fail("请输入帐号密码", 1);
        }
        else {
            try {
                const res = yield axios.post("/user/register", { user, pwd, type });
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: REGISTER, payload: res.data.data });
                    setToken(res.data.token);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
export function login({ user, pwd }) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        if (!user || !pwd) {
            Toast.fail("请输入帐号密码", 1);
        }
        else {
            try {
                const res = yield axios.post("/user/login", { user, pwd });
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({ type: LOGIN, payload: res.data.data });
                    setToken(res.data.token);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}
export function getInfo() {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios.post("/user/info");
            if (res.status === 200 && res.data.code === 0) {
                dispatch({ type: GET_INFO, payload: res.data.data });
                dispatch(connectSocket());
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function getMyOrders() {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios.post("/user/orders");
            if (res.status === 200 && res.data.code === 0) {
                dispatch({ type: GET_MY_ORDERS, payload: fromJS(res.data.data) });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function logout() {
    return { type: LOG_OUT };
}
