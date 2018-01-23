/* eslint-disable import/first */
import React from "react";
import ChatListItem from "./chatListItem";
import Immutable from 'immutable';

interface Props {
  currentChatList: Immutable.List<any>
  userId: string
}

class ChatList extends React.PureComponent<Props> {
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  render() {
    const { currentChatList, userId } = this.props;
    return (
      <div>
        <div style={{ margin: "60px 0 55px" }}>
          {!currentChatList.isEmpty() &&
            currentChatList.map(v => (
              <ChatListItem
                key={v.get("date")}
                messageObj={v}
                userId={userId}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ChatList;
