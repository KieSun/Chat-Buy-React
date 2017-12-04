import React from 'react'
import {connect} from 'react-redux'
import {getGoodsInfo, addToCart} from '../actions/goods'
import GoodsList from '../components/goods/goodsList'
import Buy from '../components/goods/buy'

@connect(
  state => state.goods,
  {getGoodsInfo, addToCart}
)
class Goods extends React.Component {
  componentDidMount() {
    this.props.getGoodsInfo()
  }
  render() {
    return (
      <div className='list'>
        <GoodsList 
          goodsList={this.props.goodsList}
          addToCart={this.props.addToCart}
        />
        <Buy />
      </div>
    )
  }
}

export default Goods