import React from "react";
import { List, InputItem } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { getUserName, sendMessage } from "../../actions/chat";
import { connect } from "react-redux";
import NavBar from "../navBar/backNavBar";

@withRouter
@connect(state => state.chat, { getUserName, sendMessage })
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
    this.props.getUserName(this.id);
  }
  handleSubmit() {
    this.props.sendMessage(this.id, this.state.value);
    this.setState({ value: "" });
  }
  render() {
    const { userName, currentChatList } = this.props;
    return (
      <div>
        {userName && (
          <NavBar title={userName} backClick={this.props.history.goBack} />
        )}
        <div style={{marginTop: '60px'}}>
          {currentChatList.map(v => <div key={v.message}>{v.message}</div>)}
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
