import React from 'react'
import { List, Stepper } from 'antd-mobile'
import PropTypes from 'prop-types'

const Item = List.Item;

class GoodsList extends React.Component {
  render() {
    return (
      <List>
        {this.props.goodsList.map(v => (
          <Item 
            key={v.id}
            extra={
              <Stepper
                style={{ width: '100%', minWidth: '100px' }}
                showNumber
                min={0}
                // value={this.state.val}
                // onChange={this.onChange}
              />}
          >{v.name}</Item>
        ))}
      </List>
    )
  }
}

GoodsList.propTypes = {
  goodsList: PropTypes.array.isRequired,
}

export default GoodsList