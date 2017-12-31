import React from "react";
import { Card, Button } from "antd-mobile";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const Item = ({ item, type, handleGetOrder, affirmOrder, chat, id }) => {
  let stateText = "";
  const state = item.get("state");
  const count = item.get("count");
  const orderId = item.get("_id");
  const customerId = item.get("customer");
  // 设置订单状态文字
  switch (state) {
    case 0:
      stateText = "等待接单";
      break;
    case 1:
      stateText = "正在派送";
      break;
    case 2:
      stateText = "订单已完成";
      break;
    default:
      break;
  }
  const countDesc = count > 1 ? ` 等${count}件` : "";

  let footerExtra = "";
  // 该组件复用在我的订单和所有订单界面，通过用户类型和订单状态定制按钮
  if (type === "deliver" && state === 0) {
    // 当用户为外卖员并且订单状态为0时显示接单按钮
    footerExtra = (
      <div>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginLeft: "8px" }}
          onClick={() => handleGetOrder(orderId)}
        >
          接单
        </Button>
      </div>
    );
  } else if (state !== 0 && state !== 2) {
    // 当订单状态不为0时，说明已被接单，显示聊天和确认订单按钮
    footerExtra = (
      <div>
        <Button
          type="ghost"
          inline
          size="small"
          onClick={() =>
            chat(customerId === id ? item.get("deliver") : customerId)
          }
        >
          联系对方
        </Button>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginLeft: "8px" }}
          onClick={() => affirmOrder(orderId)}
        >
          确认送达
        </Button>
      </div>
    );
  } else {
    // 订单状态已送达不显示按钮
    footerExtra = null;
  }

  return (
    <Card className="list-item">
      <Card.Header title="YCK 的店" extra={<span>{stateText}</span>} />
      <Card.Body>
        <div className="card-body">
          <div>{item.get("desc") + countDesc}</div>
          <div>¥{item.get("price")}</div>
        </div>
      </Card.Body>
      <Card.Footer extra={footerExtra} />
    </Card>
  );
};

Item.propTypes = {
  // 订单数据
  item: ImmutablePropTypes.map.isRequired,
  // 当前用户类型
  type: PropTypes.string.isRequired,
  // 接单
  handleGetOrder: PropTypes.func,
  // 确认订单
  affirmOrder: PropTypes.func,
  // 聊天
  chat: PropTypes.func
};

export default Item;
