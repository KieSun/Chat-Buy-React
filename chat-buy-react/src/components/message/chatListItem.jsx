import React from "react";

const ChatListItem = ({ messageObj, userId }) => {
  let isMine = true
  if (messageObj.from !== userId) {
    isMine = false
  } 
  return (
    <div className={isMine ? 'chat-list-item reverse' : 'chat-list-item'}>
      <div className='circle'>{isMine ? '我' : '对方'}</div>
      <p className='message'>{messageObj.message}</p>
    </div>
  );
};

export default ChatListItem;
