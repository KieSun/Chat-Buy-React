import React from "react";
import { TabBar, NavBar } from "antd-mobile";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getInfo } from "../actions/user";

import asyncComponent from "../asyncComponent";

const Goods = asyncComponent(() => import("./goods.jsx"));
const My = asyncComponent(() => import("./my.jsx"));
const AllOrders = asyncComponent(() => import("./allOrders.jsx"));
const Message = asyncComponent(() => import("./message.jsx"));
const NotFound = asyncComponent(() => import("../components/common/404.jsx"));
const MyOrder = asyncComponent(() => import('../components/myOrder/myOrder.jsx'))

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
    path: "/message",
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

@connect(state => state.user, { getInfo })
class DashBoard extends React.Component {
  componentDidMount() {
    const { history, type } = this.props;
    if (window.localStorage.getItem("token")) {
      if (!type) {
        this.props.getInfo();
      }
    } else {
      history.push("/login");
    }
  }
  
  render() {
    const { type, location, history, path } = this.props;
    if (!type) {
      return null;
    } else if (path && location.pathname === "/") {
      return <Redirect to={path} />;
    }
    let currentNavBar = list.find(v => v.path === location.pathname);
    return (
      <div>
        {currentNavBar ? (
          <NavBar className="nav">
            {currentNavBar.title}
          </NavBar>
        ) : null}
        <Switch>
          {list.map(v => (
            <Route exact key={v.path} path={v.path} component={v.component} />
          ))}
          <Route path="/me/orders" component={MyOrder}/>
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
