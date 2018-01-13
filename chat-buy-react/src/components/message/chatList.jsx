import React from "react";
import ChatListItem from "./chatListItem";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

class ChatList extends React.PureComponent {
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  render() {
    const { currentChatList, userId } = this.props;
    console.log('render')
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

ChatList.propTypes = {
  currentChatList: ImmutablePropTypes.list.isRequired,
  userId: PropTypes.string.isRequired
};

export default ChatList;
