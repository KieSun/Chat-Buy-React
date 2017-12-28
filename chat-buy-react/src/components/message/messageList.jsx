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
  filterNoReadCount(obj) {
    console.log(obj);
    const {userId} = this.props;
    console.log(obj);
    return 0
    // const sendObj = obj.bothSide.find(v => v.user == userId)
    // let readId
    // if (sendObj) {
    //   readId = sendObj.lastId
    // }
    // let array = obj.messages.filter(v => {
    //   return v.to == userId
    // })
    // if (readId) {
    //   let index = array.findIndex(v => readId == v._id)
    //   return array.length - index - 1
    // } else {
    //   return array.length
    // }
  }
  getSideObj(userId, bothSide) {
    return bothSide.find(v => v.user != userId)
  }
  render() {
    const { messageList, userId, history, setCurrentChatList } = this.props;
    return (
      <div style={{ margin: "60px 0 46px" }}>
        {!!messageList.size && (
          <List>
            {messageList.map(v => (
              <Item
                key={v.messageId}
                arrow="horizontal"
                extra={!!this.filterNoReadCount(v) && <span className='no-read-circle'>{this.filterNoReadCount(v)}</span>}
                onClick={() => {
                  setCurrentChatList(v);
                  history.push(
                    `/chat/${this.getSideObj(userId, v.bothSide).user}`
                  );
                }}
              >
                {this.getSideObj(userId, v.bothSide).name}
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
