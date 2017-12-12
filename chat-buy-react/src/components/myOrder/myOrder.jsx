import React from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMyOrders} from '../../actions/user';
import {affirmOrder} from '../../actions/order';
import MyOrderItem from './myOrderItem';
// import PropTypes from 'prop-types'

@connect (state => state.user, {getMyOrders, affirmOrder})
class MyOrder extends React.Component {
  componentDidMount () {
    this.props.getMyOrders ();
  }
  render () {
    console.log (this.props.orders);
    return (
      <div>
        <NavBar
          className="nav"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack ()}
        >
          我的订单
        </NavBar>
        <div style={{marginTop: '60px'}}>
          {this.props.orders.map (v => (
            <MyOrderItem
              item={v}
              type={this.props.type}
              key={v.orderId}
              affirmOrder={this.props.affirmOrder}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MyOrder;
