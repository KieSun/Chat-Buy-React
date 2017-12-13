import React from "react";
import { List } from "antd-mobile";

const Item = List.Item;

const My = () => (
  <div className="list">
    <List style={{ marginTop: "100px" }}>
      <Item
        arrow="horizontal"
        onClick={() => this.props.history.push("/me/orders")}
      >
        我的订单
      </Item>
    </List>
  </div>
);

export default My;
