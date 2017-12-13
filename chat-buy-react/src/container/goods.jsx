import React from "react";
import { connect } from "react-redux";
import { getGoodsInfo, addToCart, buy } from "../actions/goods";
import GoodsList from "../components/goods/goodsList";
import Buy from "../components/goods/buy";

@connect(state => state.goods, { getGoodsInfo, addToCart, buy })
class Goods extends React.Component {
  componentDidMount() {
    if (!this.props.goodsList.length) {
      this.props.getGoodsInfo();
    }
  }
  render() {
    const { goodsList, addToCart, shopCart, totalPrice, buy } = this.props;
    return (
      <div className="list">
        <GoodsList
          goodsList={goodsList}
          addToCart={addToCart}
          shopCart={shopCart}
        />
        <Buy price={totalPrice} handleBuy={() => buy()} />
      </div>
    );
  }
}

export default Goods;
