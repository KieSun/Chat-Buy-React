import React from "react";
import { withRouter } from "react-router-dom";
import { getMessageList } from "../../actions/chat";
import { connect } from "react-redux";
import { List } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

@withRouter
@connect(state => state.chat, { getMessageList })
class MessageList extends React.Component {
  componentDidMount() {
    !this.props.messageList.length && this.props.getMessageList();
  }
  render() {
    console.log(this.props.messageList)
    return (
      <div style={{ marginTop: "60px" }}>
        {this.props.messageList.length && <List>
          {this.props.messageList.map(v => (
            <Item key={v.messageId} arrow="horizontal" onClick={() => {}}>
              {this.props.userId == v.bothSide[0].user ? v.bothSide[1].name : v.bothSide[0].name} 
              <Brief>{v.messages.last().message}</Brief>
            </Item>
          ))}
        </List>}
      </div>
    );
  }
}

export default MessageList;
