import React from 'react'
import { List, Stepper } from 'antd-mobile'
import PropTypes from 'prop-types'

const Item = List.Item;

function getCount(shopCart, id) {
  let obj = shopCart.find(value => {
    return id === value.id
  })
  return obj ? obj.count : 0
}

const GoodsList = ({goodsList, addToCart, shopCart}) => {
  return (
    <List>
      {goodsList.map(v => (
        <Item 
          key={v.id}
          extra={
            <Stepper
              style={{ width: '100%', minWidth: '100px' }}
              showNumber
              min={0}
              max={99}
              value={shopCart.length && getCount(shopCart, v.id)}
              defaultValue={0}
              onChange={(count) => addToCart({id: v.id, price:v.price, count}) }
            />}
        >{v.name}</Item>
      ))}
    </List>
  )
}


GoodsList.propTypes = {
  goodsList: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  shopCart: PropTypes.array.isRequired,
}

export default GoodsList