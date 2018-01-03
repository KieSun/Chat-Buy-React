import React from "react";
import MessageList from "../components/message/messageList";
import { setCurrentChatList } from "../actions/chat";
import { connect } from "react-redux";

@connect(state => ({ chat: state.get("chat") }), { setCurrentChatList })
class Message extends React.Component {
  constructor() {
    super();
    this.handlePush = this.handlePush.bind(this);
    this.getSideObj = this.getSideObj.bind(this);
  }
  // 找出聊天对象昵称
  getSideObj(userId, bothSide) {
    return bothSide.find(v => v.get("user") !== userId);
  }
  handlePush(value) {
    const { chat, setCurrentChatList, history } = this.props;
    const userId = chat.get("userId");
    setCurrentChatList(value);
    history.push(
      `/chat/${this.getSideObj(userId, value.get("bothSide")).get("user")}`
    );
  }
  render() {
    const { chat } = this.props;
    const messageList = chat.get("messageList");
    const userId = chat.get("userId");
    const noReadCounts = chat.get("noReadCounts");
    return (
      <div>
        <MessageList
          messageList={messageList}
          noReadCounts={noReadCounts}
          push={this.handlePush}
          userId={userId}
          getSideObj={this.getSideObj}
        />
      </div>
    );
  }
}

export default Message;
