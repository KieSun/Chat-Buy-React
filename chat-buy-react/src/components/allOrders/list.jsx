import React from 'react'
import MyOrderItem from '../myOrder/myOrderItem'
import {connect} from 'react-redux'
import {getAllOrders} from '../../actions/order'

@connect(
  state => state.order,
  {getAllOrders}
)
class List extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  handleGetOrder() {
    
  }
  render() {
    return (
      <div style={{marginTop: '60px'}}>
        {this.props.allOrders.map(v => (
            <MyOrderItem 
                item={v}
                type='deliver'
                key={v._id}
                handleGetOrder={this.handleGetOrder}
            />
        ))}
      </div>
    )
  }
}

export default List