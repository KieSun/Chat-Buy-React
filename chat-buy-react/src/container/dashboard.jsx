import React from "react";
import { TabBar, NavBar } from "antd-mobile";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getInfo } from "../actions/user";
import { connectSocket, getMessageList } from "../actions/chat";

import asyncComponent from "../asyncComponent";

const Goods = asyncComponent(() => import("./goods.jsx"));
const My = asyncComponent(() => import("./my.jsx"));
const AllOrders = asyncComponent(() => import("./allOrders.jsx"));
const Message = asyncComponent(() => import("./message.jsx"));
const NotFound = asyncComponent(() => import("../components/common/404.jsx"));
const MyOrder = asyncComponent(() =>
  import("./myOrder.jsx")
);
const Chat = asyncComponent(() => import("./chat.jsx"));

const list = [
  {
    title: "订单",
    path: "/allOrders",
    type: "customer", // 代表 customer 不需要显示订单页面
    component: AllOrders,
    imgName: "order"
  },
  {
    title: "商品",
    path: "/goods",
    type: "deliver",
    component: Goods,
    imgName: "goods"
  },
  {
    title: "消息",
    path: "/messageList",
    component: Message,
    imgName: "message"
  },
  {
    title: "我的",
    path: "/me",
    component: My,
    imgName: "user"
  }
];

@connect(
  state => ({
    user: state.get("user"),
    noReadCount: state.get("chat").get("noReadCount")
  }),
  {
    getInfo,
    connectSocket,
    getMessageList
  }
)
class DashBoard extends React.Component {
  componentDidMount() {
    const { history, connectSocket, user } = this.props;
    // 判断是否已经登录
    if (window.localStorage.getItem("token")) {
      // 判断是否已经拉取用户信息
      if (!user.get("type")) {
        this.props.getInfo();
      } else {
        connectSocket();
      }
    } else {
      history.push("/login");
    }
    // 获取聊天消息列表
    this.props.getMessageList();
  }

  render() {
    const { location, history, noReadCount, user } = this.props;
    const type = user.get("type");
    const path = user.get("path");
    if (!type) {
      return null;
    } else if (path && location.pathname === "/") {
      // 如果用户没有输入具体路径 会跳转到当前用户类型所能跳转的第一个 Tabbar
      return <Redirect to={path} />;
    }
    // 判断当前 URL 是否匹配
    let currentNavBar = list.find(v => v.path === location.pathname);
    return (
      <div>
        {currentNavBar ? (
          <NavBar className="nav">{currentNavBar.title}</NavBar>
        ) : null}
        <Switch>
          {/* 除了登录和注册，其他所有路由都会先跳转到这里 */}
          {list.map(v => (
            <Route exact key={v.path} path={v.path} component={v.component} />
          ))}
          <Route path="/me/orders" component={MyOrder} />
          <Route path="/chat/:id" component={Chat} />
          <Route component={NotFound} />
        </Switch>
        <div className="dashBoard-wrapper">
          <TabBar hidden={!currentNavBar}>
            {/* 将不需要显示的组件过滤 */}
            {list.filter(v => v.type !== type).map(v => (
              <TabBar.Item
                icon={{ uri: require(`../images/${v.imgName}.png`) }}
                selectedIcon={{
                  uri: require(`../images/${v.imgName}-sel.png`)
                }}
                badge={v.path === "/messageList" && noReadCount}
                title={v.title}
                key={v.title}
                selected={location.pathname === v.path}
                onPress={() => {
                  history.push(v.path);
                }}
              />
            ))}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default DashBoard;
