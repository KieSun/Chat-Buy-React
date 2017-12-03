import React from 'react'
import {connect} from 'react-redux'
import {getGoodsInfo} from '../actions/goods'
import GoodsList from '../components/goods/goodsList'

@connect(
  state => state.goods,
  {getGoodsInfo}
)
class Goods extends React.Component {
  componentDidMount() {
    this.props.getGoodsInfo()
  }
  render() {
    return (
      <div>
        <GoodsList 
          goodsList={this.props.goodsList}
        />
      </div>
    )
  }
}

export default Goods