import React from "react";
import { withRouter } from "react-router-dom";
import {
  getUserName,
  setCurrentChatList,
  cleanNoRead
} from "../../actions/chat";
import { connect } from "react-redux";
import NavBar from "../navBar/backNavBar";
import ChatListItem from "./chatListItem";

@withRouter
@connect(state => ({chat: state.get('chat')}), {
  getUserName,
  setCurrentChatList,
  cleanNoRead
})
class ChatList extends React.Component {
  componentDidMount() {
    // 获取当前聊天对象 ID
    this.id = this.props.match.params.id;
    const {chat} = this.props
    if (chat.get('currentChatList').isEmpty()) {
      // 找到对应聊天对象聊天数组
      let currentList = chat.get('messageList').find(v => {
        return v.get('messageId') === [chat.get('userId'), this.id].sort().join("");
      });
      if (currentList) {
        this.props.setCurrentChatList(currentList);
      }
    }
    this.props.getUserName(this.id);
  }
  // componentWillUnmount() {
  //   const { currentChatList, currentMessageId } = this.props;
  //   if (!currentChatList.length) {
  //     return;
  //   }
  //   let index;
  //   for (let i = currentChatList.length - 1; i > 0; i--) {
  //     if (currentChatList[i].to == this.props.userId) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   if (index) {
  //     this.props.cleanNoRead(currentChatList[index]._id, currentMessageId);
  //   }
  // }
  render() {
    window.scrollTo(0, document.body.scrollHeight);
    const {chat, history} = this.props
    const userName = chat.get('userName')
    const currentChatList = chat.get('currentChatList')
    return (
      <div>
        {!!userName && (
          <NavBar title={userName} backClick={history.goBack} />
        )}
        <div style={{ margin: "60px 0 55px" }}>
          {!currentChatList.isEmpty() &&
            currentChatList.map(v => (
              <ChatListItem key={v.get('date')} messageObj={v} userId={chat.get('userId')} />
            ))}
        </div>
      </div>
    );
  }
}

export default ChatList;
