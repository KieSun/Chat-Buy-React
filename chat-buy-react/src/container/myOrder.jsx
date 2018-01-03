import React from "react";
import { connect } from "react-redux";
import { getMyOrders } from "../actions/user";
import { affirmOrder } from "../actions/order";
import MyOrderItem from "../components/myOrder/myOrderItem";
import NavBar from "../components/navBar/backNavBar";

@connect(state => ({ user: state.get("user") }), { getMyOrders, affirmOrder })
class MyOrder extends React.Component {
  constructor() {
    super();
    this.handleChat = this.handleChat.bind(this);
  }
  componentDidMount() {
    this.props.getMyOrders();
  }
  handleChat(id) {
    this.props.history.push(`/chat/${id}`);
  }
  render() {
    const { history, affirmOrder, user } = this.props;
    return (
      <div>
        <NavBar title="我的订单" backClick={history.goBack} />
        <div style={{ marginTop: "60px" }}>
          {user
            .get("orders")
            .map(v => (
              <MyOrderItem
                item={v}
                type={user.get("type")}
                key={v.get("_id")}
                affirmOrder={affirmOrder}
                chat={this.handleChat}
                id={user.get("id")}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default MyOrder;
