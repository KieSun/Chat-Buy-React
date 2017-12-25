import React from "react";
import { List, InputItem } from "antd-mobile";
import { withRouter } from "react-router-dom";
import {
  getUserName,
  sendMessage,
  setCurrentChatList
} from "../../actions/chat";
import { connect } from "react-redux";
import NavBar from "../navBar/backNavBar";
import ChatListItem from "./chatListItem";

@withRouter
@connect(state => state.chat, { getUserName, sendMessage, setCurrentChatList })
class ChatList extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.id = this.props.match.params.id;
    if (!this.props.currentChatList.length) {
      let currentList = this.props.messageList.find(v => {
        return v.messageId == [this.props.userId, this.id].sort().join("");
      });
      if (currentList) {
        this.props.setCurrentChatList(currentList.messages);
      }
    }
    this.props.getUserName(this.id);
  }
  handleSubmit() {
    this.props.sendMessage(this.id, this.state.value);
    this.setState({ value: "" });
  }
  render() {
    window.scrollTo(0,document.body.scrollHeight);
    const { userName, currentChatList, userId } = this.props;
    return (
      <div>
        {userName && (
          <NavBar title={userName} backClick={this.props.history.goBack} />
        )}
        <div style={{ margin: "60px 0 55px" }}>
          {currentChatList.map(v => <ChatListItem key={v.date} messageObj={v} userId={userId} />)}
        </div>
        <div className="bottom-input">
          <List style={{ width: "100%" }}>
            <InputItem
              placeholder="请输入信息"
              value={this.state.value}
              onChange={value => this.setState({ value })}
              extra={<span>发送</span>}
              onExtraClick={() => this.handleSubmit()}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default ChatList;
