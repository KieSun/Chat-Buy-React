import {
  GOODS_LIST,
  ADD_TO_CART
} from '../actions/type'

const initialState = {
  goodsList: [],
  shopCart: [],
  totalPrice: 0
};

function changeShopCart(shopCart, {id, price, count}, totalPrice) {
  const obj = shopCart.find(v => {
    if (v.id === id) {
      if (v.count > count) {
        totalPrice = totalPrice - (v.count - count) * price
      } else {
        totalPrice = totalPrice + (count - v.count) * price
      }
      v.count = count
    }
    return v.id === id
  })
  
  if (!obj) {
    shopCart.push({id, price, count})
    totalPrice += price * count
    return [shopCart, totalPrice]
  } else {
    count === 0 && shopCart.splice(shopCart.indexOf(obj), 1)
    return [shopCart, totalPrice]
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
      case GOODS_LIST:
        return {...state, goodsList: action.payload}
      case ADD_TO_CART:
        let data = changeShopCart(state.shopCart, action.payload, state.totalPrice)
        return {
          ...state, 
          shopCart: data[0], 
          totalPrice: data[1]
        }
      default:
        break
  }
  return state
}