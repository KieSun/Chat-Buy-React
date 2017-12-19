import React from "react";
import { Card, Button } from "antd-mobile";
import PropTypes from "prop-types";

const Item = ({ item, type, handleGetOrder, affirmOrder, chat, id }) => {
  let stateText = "";
  switch (item.state) {
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
  const countDesc = item.count > 1 ? ` 等${item.count}件` : "";

  let footerExtra = "";
  if (type === "deliver" && item.state === 0) {
    footerExtra = (
      <div>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginLeft: "8px" }}
          onClick={() => handleGetOrder(item._id)}
        >
          接单
        </Button>
      </div>
    );
  } else if (item.state !== 0 && item.state !== 2) {
    footerExtra = (
      <div>
        <Button
          type="ghost"
          inline
          size="small"
          onClick={() => chat(item.customer == id ? item.deliver : item.customer)}
        >
          联系对方
        </Button>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginLeft: "8px" }}
          onClick={() => affirmOrder(item._id)}
        >
          确认送达
        </Button>
      </div>
    );
  } else {
    footerExtra = null;
  }

  return (
    <Card className="list-item">
      <Card.Header title="YCK 的店" extra={<span>{stateText}</span>} />
      <Card.Body>
        <div className="card-body">
          <div>{item.desc + countDesc}</div>
          <div>¥{item.price}</div>
        </div>
      </Card.Body>
      <Card.Footer extra={footerExtra} />
    </Card>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleGetOrder: PropTypes.func,
  affirmOrder: PropTypes.func
};

export default Item;
