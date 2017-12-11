import React from 'react'
import MyOrderItem from '../myOrder/myOrderItem'
import {connect} from 'react-redux'
import {getAllOrders, getOrder} from '../../actions/order'

@connect(
  state => state.order,
  {getAllOrders, getOrder}
)
class List extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  render() {
    return (
      <div style={{marginTop: '60px'}}>
        {this.props.allOrders.map(v => (
            <MyOrderItem 
                item={v}
                type='deliver'
                key={v._id}
                handleGetOrder={this.props.getOrder}
            />
        ))}
      </div>
    )
  }
}

export default List