import React from "react";
import MyOrderItem from "../myOrder/myOrderItem";
import { connect } from "react-redux";
import { getAllOrders, getOrder, affirmOrder } from "../../actions/order";

@connect(state => state.order, { getAllOrders, getOrder, affirmOrder })
class List extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }
  render() {
    const { allOrders, getOrder, affirmOrder } = this.props;
    return allOrders.length ? (
      <div style={{ marginTop: "60px" }}>
        {allOrders.map(v => (
          <MyOrderItem
            item={v}
            type="deliver"
            key={v._id}
            handleGetOrder={getOrder}
            affirmOrder={affirmOrder}
          />
        ))}
      </div>
    ) : null
  }
}

export default List;
