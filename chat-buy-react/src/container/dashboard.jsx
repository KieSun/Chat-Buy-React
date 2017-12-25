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
  import("../components/myOrder/myOrder.jsx")
);
const Chat = asyncComponent(() => import("./chat.jsx"));

const list = [
  {
    title: "订单",
    path: "/allOrders",
    type: "customer",
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

@connect(state => ({ user: state.user, noReadCount: state.chat.noReadCount }), {
  getInfo,
  connectSocket,
  getMessageList
})
class DashBoard extends React.Component {
  componentDidMount() {
    const { history, connectSocket } = this.props;
    const { type } = this.props.user;
    if (window.localStorage.getItem("token")) {
      if (!type) {
        this.props.getInfo();
      } else {
        connectSocket();
      }
    } else {
      history.push("/login");
    }
    this.props.getMessageList();
  }

  render() {
    const { location, history, noReadCount } = this.props;
    const { type, path } = this.props.user;
    if (!type) {
      return null;
    } else if (path && location.pathname === "/") {
      return <Redirect to={path} />;
    }
    let currentNavBar = list.find(v => v.path === location.pathname);
    return (
      <div>
        {currentNavBar ? (
          <NavBar className="nav">{currentNavBar.title}</NavBar>
        ) : null}
        <Switch>
          {list.map(v => (
            <Route exact key={v.path} path={v.path} component={v.component} />
          ))}
          <Route path="/me/orders" component={MyOrder} />
          <Route path="/chat/:id" component={Chat} />
          <Route component={NotFound} />
        </Switch>
        <div className="dashBoard-wrapper">
          <TabBar hidden={!currentNavBar}>
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
