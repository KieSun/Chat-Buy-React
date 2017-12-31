import React from "react";
import { connect } from "react-redux";
import { getGoodsInfo, addToCart, buy } from "../actions/goods";
import GoodsList from "../components/goods/goodsList";
import Buy from "../components/goods/buy";

@connect(state => ({ goods: state.get("goods") }), {
  getGoodsInfo,
  addToCart,
  buy
})
class Goods extends React.Component {
  componentDidMount() {
    if (this.props.goods.get("goodsList").isEmpty()) {
      this.props.getGoodsInfo();
    }
  }
  render() {
    const { goods, addToCart, buy } = this.props;
    const goodsList = goods.get("goodsList");
    return goodsList.isEmpty() ? null : (
      <div className="goods-list">
        <GoodsList
          goodsList={goodsList}
          addToCart={addToCart}
          shopCart={goods.get("shopCart")}
        />
        <Buy price={goods.get("totalPrice")} handleBuy={buy} />
      </div>
    );
  }
}

export default Goods;
