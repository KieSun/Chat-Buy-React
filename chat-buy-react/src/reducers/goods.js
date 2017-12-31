import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "../actions/type";
import { List, Map } from "immutable";

const initialState = Map({
  // 当前商品列表
  goodsList: List([]),
  // 购物车
  shopCart: List([]),
  // 总价
  totalPrice: 0
});

/**
 * @param  {} shopCart 当前购物车
 * @param  {} {id 商品 ID
 * @param  {} price 商品价格
 * @param  {} count} 商品件数
 * @param  {} totalPrice 当前总价
 */
function changeShopCart(shopCart, { id, price, count }, totalPrice) {
  // 在当前购物车寻找是否已经添加过该商品
  const index = shopCart.findIndex(item => item.get("id") === id);
  if (index === -1) {
    // 判断当前购物车是否找到该商品，没有就 push 商品，并修改总价
    if (count === 0) {
      return [shopCart, totalPrice];
    }
    shopCart = shopCart.push(Map({ id, price, count }));
    totalPrice += price * count;
    return [shopCart, totalPrice];
  }
  shopCart = shopCart.update(index, product => {
    // 如果在购物车中找到该商品，修改总价
    const currentCount = product.get("count");
    if (currentCount > count) {
      totalPrice = totalPrice - (currentCount - count) * price;
    } else {
      totalPrice = totalPrice + (count - currentCount) * price;
    }
    return product.set("count", count);
  });
  if (count === 0) {
    // 判断如果该商品件数等于0，就删除购物中的当前商品
    shopCart = shopCart.remove(index);
    return [shopCart, totalPrice];
  } else {
    return [shopCart, totalPrice];
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOODS_LIST:
      return state.set("goodsList", action.payload);
    case ADD_TO_CART:
      let data = changeShopCart(
        state.get("shopCart"),
        action.payload,
        state.get("totalPrice")
      );
      return state.merge({ shopCart: data[0], totalPrice: data[1] });
    case BUY_SUCCESS:
      return state.merge({ shopCart: List([]), totalPrice: 0 });
    default:
      break;
  }
  return state;
}
