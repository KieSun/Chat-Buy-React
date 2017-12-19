import React from "react";
import { List, InputItem } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { getUserName } from "../../actions/chat";
import { connect } from "react-redux";
import NavBar from "../navBar/backNavBar";

@withRouter
@connect(state => state.chat, { getUserName })
class ChatList extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id
    if (id) {
      this.props.getUserName(id);
    } else {
      this.props.history.push('/chat')
    }
    
  }
  handleSubmit() {
    this.setState({ value: "" });
  }
  render() {
    const { userName } = this.props;
    console.log(this.props);
    return (
      <div>
        {userName && (
          <NavBar title={userName} backClick={this.props.history.goBack} />
        )}
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
      </div>
    );
  }
}

export default ChatList;
