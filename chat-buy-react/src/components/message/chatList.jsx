import React from "react";
import { List, InputItem } from "antd-mobile";
import { connect } from "react-redux";
import { getUserName } from "../../actions/chat";

@connect(null, { getUserName })
class ChatList extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this);
    // this.props.getUserName()
  }
  handleSubmit() {
    this.setState({ value: "" });
  }
  render() {
    return (
      <div className="bottom-input">
        <List style={{ width: "100%" }}>
          <InputItem
            placeholder="请输入信息"
            onChange={value => this.setState({ value })}
            extra={<span>发送</span>}
            onExtraClick={() => this.handleSubmit()}
          />
        </List>
      </div>
    );
  }
}

export default ChatList;
