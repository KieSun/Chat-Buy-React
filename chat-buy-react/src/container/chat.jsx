import React from "react";
import { List, InputItem } from "antd-mobile";
import ChatList from "../components/message/chatList";
import NavBar from "../components/navBar/backNavBar";
import {
  cleanNoRead,
  getUserName,
  sendMessage,
  setCurrentChatList,
  getMessageList
} from "../actions/chat";
import { connect } from "react-redux";

@connect(state => ({ chat: state.get("chat") }), {
  getUserName,
  setCurrentChatList,
  cleanNoRead,
  sendMessage,
  getMessageList
})
class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // 获取当前聊天对象 ID
    this.id = this.props.match.params.id;
    const { chat } = this.props;
    const messageId = [chat.get("userId"), this.id].sort().join("");
    const messageList = chat.get("messageList");
    if (messageList) {
      let currentList = messageList.find(v => {
        return v.get("messageId") === messageId;
      });
      this.props.setCurrentChatList(currentList, messageId);
      this.props.getUserName(this.id);
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      this.props.getMessageList();
    }
  }
  componentWillUnmount() {
    // 组件销毁前发送清除未读消息请求
    const { chat } = this.props;
    const currentChatList = chat.get("currentChatList");
    const currentMessageId = chat.get("currentMessageId");
    if (currentChatList.isEmpty()) {
      return;
    }
    let last = currentChatList.findLast(v => {
      return v.get("to") === chat.get("userId");
    });
    if (last) {
      this.props.cleanNoRead(last.get("_id"), currentMessageId);
    }
  }
  // 提交聊天信息
  handleSubmit() {
    if (this.state.value.trim()) {
      this.props.sendMessage(this.props.match.params.id, this.state.value);
      this.setState({ value: "" });
    }
  }
  render() {
    const { chat, history } = this.props;
    const userName = chat.get("userName");
    return (
      <div>
        {!!userName && <NavBar title={userName} backClick={history.goBack} />}
        <ChatList
          currentChatList={chat.get("currentChatList")}
          userId={chat.get("userId")}
        />
        <div className="bottom-input">
          <List style={{ width: "100%" }}>
            <InputItem
              placeholder="请输入信息"
              autoFocus={true}
              value={this.state.value}
              onChange={value => this.setState({ value })}
              extra={<span>发送</span>}
              onExtraClick={this.handleSubmit}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;
