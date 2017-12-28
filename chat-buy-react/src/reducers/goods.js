import { GOODS_LIST, ADD_TO_CART, BUY_SUCCESS } from "../actions/type";

const initialState = {
  goodsList: [],
  shopCart: [],
  totalPrice: 0
};

/**
 * @param  {} shopCart 当前购物车
 * @param  {} {id 商品 ID
 * @param  {} price 商品价格
 * @param  {} count} 商品件数
 * @param  {} totalPrice 当前总价
 */
function changeShopCart(shopCart, { id, price, count }, totalPrice) {
  // 在当前购物车寻找是否已经添加过该商品
  const obj = shopCart.find(v => {
    if (v.id === id) {
      // 如果减少商品件数就减少总价，反之亦然
      if (v.count > count) {
        totalPrice = totalPrice - (v.count - count) * price;
      } else {
        totalPrice = totalPrice + (count - v.count) * price;
      }
      v.count = count;
    }
    return v.id === id;
  });

  // 判断当前购物车是否找到该商品，没有就 push 商品，并修改总价
  if (!obj) {
    shopCart.push({ id, price, count });
    totalPrice += price * count;
    return [shopCart, totalPrice];
  } else {
    // 判断如果该商品件数等于0，就删除购物中的当前商品
    count === 0 && shopCart.splice(shopCart.indexOf(obj), 1);
    return [shopCart, totalPrice];
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOODS_LIST:
      return { ...state, goodsList: action.payload };
    case ADD_TO_CART:
      let data = changeShopCart(
        state.shopCart,
        action.payload,
        state.totalPrice
      );
      return {
        ...state,
        shopCart: data[0],
        totalPrice: data[1]
      };
    // 购买完成清空购物车
    case BUY_SUCCESS:
      return { ...state, shopCart: [], totalPrice: 0 };
    default:
      break;
  }
  return state;
}
