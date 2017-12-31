import React from "react";
import { List, Stepper } from "antd-mobile";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

const Item = List.Item;
const Brief = Item.Brief;

function getCount(shopCart, id) {
  let obj = shopCart.find(value => {
    return id === value.get("id");
  });
  return obj ? obj.get("count") : 0;
}

const GoodsList = ({ goodsList, addToCart, shopCart }) => {
  return (
    <List>
      {goodsList.map(v => (
        <Item
          key={v.get("id")}
          extra={
            <Stepper
              style={{ width: "100%", minWidth: "100px" }}
              showNumber
              min={0}
              max={99}
              value={shopCart.size && getCount(shopCart, v.get("id"))}
              defaultValue={0}
              onChange={count =>
                addToCart({ id: v.get("id"), price: v.get("price"), count })
              }
            />
          }
        >
          {v.get("name")} <Brief>¥{v.get("price")}</Brief>
        </Item>
      ))}
    </List>
  );
};

GoodsList.propTypes = {
  goodsList: ImmutablePropTypes.list.isRequired,
  addToCart: PropTypes.func.isRequired,
  shopCart: ImmutablePropTypes.list.isRequired
};

export default GoodsList;
