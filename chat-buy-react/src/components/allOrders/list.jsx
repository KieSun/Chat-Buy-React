import React from "react";
import MyOrderItem from "../myOrder/myOrderItem";
import { connect } from "react-redux";
import { getAllOrders, getOrder, affirmOrder } from "../../actions/order";

@connect(state => ({order: state.get('order')}), { getAllOrders, getOrder, affirmOrder })
class List extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }
  render() {
    const { order, getOrder, affirmOrder } = this.props;
    const allOrders = order.get('allOrders')
    return !allOrders.isEmpty() ? (
      <div style={{ marginTop: "60px" }}>
        {allOrders.map(v => (
          <MyOrderItem
            item={v}
            type="deliver"
            key={v.get('_id')}
            handleGetOrder={getOrder}
            affirmOrder={affirmOrder}
          />
        ))}
      </div>
    ) : null
  }
}

export default List;
