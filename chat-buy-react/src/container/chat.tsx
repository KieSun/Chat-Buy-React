/* eslint-disable import/first */
import * as React from "react";
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
import { RouteComponentProps } from "react-router-dom";
import ImmutablePropTypes from 'immutable';

interface Props {
  chat: ImmutablePropTypes.Map<string, any>
}

interface Action {
  getUserName: (userId: number) => void
  setCurrentChatList: (list: ImmutablePropTypes.Map<keyof CurrentList, any>, id: string) => void
  cleanNoRead: (lastId: string, currentId: string) => void
  sendMessage: (id: number, value: string) => void
  getMessageList: () => void
}

interface Params {
  id: number
}

interface State {
  value: string
}

interface CurrentList {
  messageId: string
}

@(connect(state => ({ chat: state.get("chat") }), {
  getUserName,
  setCurrentChatList,
  cleanNoRead,
  sendMessage,
  getMessageList
}) as any)
class Chat extends React.Component<RouteComponentProps<Params> & Props & Action, State> {
  state = {
    value: ""
  }
  id = this.props.match.params.id;
  componentDidMount() {
    // 获取当前聊天对象 ID
    const { chat } = this.props;
    const messageId = [chat.get("userId"), this.id].sort().join("");
    const messageList: ImmutablePropTypes.List<ImmutablePropTypes.Map<keyof CurrentList, any>> = chat.get("messageList");
    if (messageList) {
      let currentList = messageList.find(v => {
        return v!.get("messageId") === messageId;
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
  handleSubmit = () => {
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
