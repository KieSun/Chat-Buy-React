import React from 'react'
import { List, Stepper } from 'antd-mobile'
import PropTypes from 'prop-types'

const Item = List.Item;

const GoodsList = ({goodsList, addToCart}) => {
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
}

export default GoodsList