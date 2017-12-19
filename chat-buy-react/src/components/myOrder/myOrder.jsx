import React from "react";
import { connect } from "react-redux";
import { getMyOrders } from "../../actions/user";
import { affirmOrder } from "../../actions/order";
import MyOrderItem from "./myOrderItem";
import NavBar from "../navBar/backNavBar";

@connect(state => state.user, { getMyOrders, affirmOrder })
class MyOrder extends React.Component {
  constructor() {
    super()
    this.handleChat = this.handleChat.bind(this)
  }
  componentDidMount() {
    this.props.getMyOrders();
  }
  handleChat(id) {
    console.log(id);
    this.props.history.push(`/chat/${id}`)
  }
  render() {
    return this.props.orders.size ? (
      <div>
        <NavBar title='我的订单' backClick={this.props.history.goBack} />
        <div style={{ marginTop: "60px" }}>
          {this.props.orders.map(v => (
            <MyOrderItem
              item={v}
              type={this.props.type}
              key={v._id}
              affirmOrder={this.props.affirmOrder}
              chat={this.handleChat}
              id={this.props.id}
            />
          ))}
        </div>
      </div>
    ) : null;
  }
}

export default MyOrder;