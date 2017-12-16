import React from "react";
import io from 'socket.io-client'
// import { List, Stepper } from "antd-mobile";
// import PropTypes from "prop-types";

// const Item = List.Item;
// const Brief = Item.Brief;

class MessageList extends React.Component {
  componentDidMount() {
    const socket = io('http://localhost:1717');
  }
  render() {
    return (
      <div>
        MessageList
      </div>
    )
  }
}


export default MessageList;
