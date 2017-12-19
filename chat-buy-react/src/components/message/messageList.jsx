import React from "react";
import { withRouter } from "react-router-dom";
import { getUserName } from "../../actions/chat";
import { connect } from "react-redux";
import NavBar from "../navBar/backNavBar";
// import { List, Stepper } from "antd-mobile";
// import PropTypes from "prop-types";

// const Item = List.Item;
// const Brief = Item.Brief;

@withRouter
@connect(state => state.chat, { getUserName })
class MessageList extends React.Component {
  componentDidMount() {
    // emit 发送一个事件
    // on 接受一个事件
    this.props.getUserName(this.props.match.params.id);
  }
  render() {
    const {userName} = this.props
    return (
      userName && <NavBar title={userName} backClick={this.props.history.goBack} />
    )
  }
}

export default MessageList;
