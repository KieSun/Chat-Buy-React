import React from 'react'
import { List, InputItem } from "antd-mobile";
import ChatList from '../components/message/chatList'
import {sendMessage} from "../actions/chat"
import {connect} from 'react-redux'

@connect(null, {sendMessage})
class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    if (this.state.value.trim()) {
      this.props.sendMessage(this.props.match.params.id, this.state.value);
      this.setState({ value: "" });
    }
  }
  render() {
    return (
      <div>
        <ChatList />
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
    )
  }
}

export default Chat