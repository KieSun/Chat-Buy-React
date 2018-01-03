import React from "react";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const Item = List.Item;
const Brief = Item.Brief;

const MessageList = ({
  messageList,
  noReadCounts,
  push,
  userId,
  getSideObj
}) => (
  <div style={{ margin: "60px 0 46px" }}>
    {!!messageList.size && (
      <List>
        {messageList.map((v, index) => (
          <Item
            key={v.get("messageId")}
            arrow="horizontal"
            extra={
              !!noReadCounts.get(index) && (
                <span className="no-read-circle">
                  {noReadCounts.get(index)}
                </span>
              )
            }
            onClick={() => {
              push(v);
            }}
          >
            {getSideObj(userId, v.get("bothSide")).get("name")}
            <Brief>
              {v
                .get("messages")
                .get(-1)
                .get("message")}
            </Brief>
          </Item>
        ))}
      </List>
    )}
  </div>
);

MessageList.propTypes = {
  messageList: ImmutablePropTypes.list.isRequired,
  noReadCounts: ImmutablePropTypes.list.isRequired,
  getSideObj: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default MessageList;
