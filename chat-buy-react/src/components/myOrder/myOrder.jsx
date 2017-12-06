import React from 'react'
import {  NavBar, Icon } from 'antd-mobile';
import {connect} from 'react-redux'
import {getMyOrders} from '../../actions/user'
// import PropTypes from 'prop-types'

@connect(
    null,
    {getMyOrders}
)
class MyOrder extends React.Component {
    componentDidMount() {
        this.props.getMyOrders()
    }
    render() {
        return (
            <div className='buy-wrapper'>
                <NavBar 
                    className='nav'
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    我的订单
                </NavBar>
            </div>
        )
    }
}

// Buy.propTypes = {
//   price: PropTypes.number.isRequired,
//   handleBuy: PropTypes.func.isRequired,
// }

export default MyOrder