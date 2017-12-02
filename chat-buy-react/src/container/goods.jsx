import React from 'react'
import {connect} from 'react-redux'
import {getGoodsInfo} from '../actions/goods'

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
        goods1
      </div>
    )
  }
}

export default Goods