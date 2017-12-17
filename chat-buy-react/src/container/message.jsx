import React from "react";
import MessageList from "../components/message/messageList";
import AnimationContainer from './animation'

class Message extends React.Component {
  render() {
    return (
      <div>
        <MessageList />
      </div>
    );
  }
}

export default AnimationContainer(Message);
