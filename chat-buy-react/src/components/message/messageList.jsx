import React from "react";
import { withRouter } from "react-router-dom";
import { getMessageList } from "../../actions/chat";
import { connect } from "react-redux";
import NavBar from "../navBar/backNavBar";
// import { List, Stepper } from "antd-mobile";

// const Item = List.Item;
// const Brief = Item.Brief;

@withRouter
@connect(state => state.chat, { getMessageList })
class MessageList extends React.Component {
  componentDidMount() {
    // emit 发送一个事件
    // on 接受一个事件
    this.props.getMessageList()
  }
  render() {
    return (
      <div style={{marginTop: '60px'}}>
        消息列表
      </div>
    )
  }
}

export default MessageList;
