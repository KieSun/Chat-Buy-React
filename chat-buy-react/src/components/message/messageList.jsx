import React from "react";
import { withRouter } from "react-router-dom";
import { setCurrentChatList } from "../../actions/chat";
import { connect } from "react-redux";
import { List } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

@withRouter
@connect(state => state.chat, { setCurrentChatList })
class MessageList extends React.Component {
  render() {
    const { messageList, userId, history, setCurrentChatList } = this.props;
    return (
      <div style={{ margin: "60px 0 46px" }}>
        {messageList.length && (
          <List>
            {messageList.map(v => (
              <Item
                key={v.messageId}
                arrow="horizontal"
                onClick={() => {
                  setCurrentChatList(v.messages);
                  history.push(
                    `/chat/${
                      userId == v.bothSide[0].user
                        ? v.bothSide[1].user
                        : v.bothSide[0].user
                    }`
                  );
                }}
              >
                {userId == v.bothSide[0].user
                  ? v.bothSide[1].name
                  : v.bothSide[0].name}
                <Brief>{v.messages.last().message}</Brief>
              </Item>
            ))}
          </List>
        )}
      </div>
    );
  }
}

export default MessageList;
