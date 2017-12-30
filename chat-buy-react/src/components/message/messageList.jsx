import React from "react";
import { withRouter } from "react-router-dom";
import { setCurrentChatList } from "../../actions/chat";
import { connect } from "react-redux";
import { List } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

@withRouter
@connect(state => ({chat: state.get('chat')}), { setCurrentChatList })
class MessageList extends React.Component {
  getSideObj(userId, bothSide) {
    return bothSide.find(v => v.get('user') !== userId)
  }
  render() {
    const { chat, history, setCurrentChatList } = this.props;
    const messageList = chat.get('messageList')
    const userId = chat.get('userId')
    const noReadCounts = chat.get('noReadCounts')
    return (
      <div style={{ margin: "60px 0 46px" }}>
        {!!messageList.size && (
          <List>
            {messageList.map((v, index) => (
              <Item
                key={v.get('messageId')}
                arrow="horizontal"
                extra={!!noReadCounts.get(index) && <span className='no-read-circle'>{noReadCounts.get(index)}</span>}
                onClick={() => {
                  setCurrentChatList(v);
                  history.push(
                    `/chat/${this.getSideObj(userId, v.get('bothSide')).get('user')}`
                  );
                }}
              >
                {this.getSideObj(userId, v.get('bothSide')).get('name')}
                <Brief>{v.get('messages').get(-1).get('message')}</Brief>
              </Item>
            ))}
          </List>
        )}
      </div>
    );
  }
}

export default MessageList;
