export function filterNoReadCount(userId, messageList) {
  let noReadCountArray = [];
  messageList.map(v => {
    // 找到当前用户的 lastId
    const sendObj = v.get("bothSide").find(v => v.get("user") === userId);
    let readId;
    if (sendObj) {
      readId = sendObj.get("lastId");
    }
    // 把发给我的消息过滤出来
    const messages = v.get("messages").filter(v => {
      return v.get("to") === userId;
    });
    if (readId) {
      // 把上次未读消息的 id 索引找到
      let index = messages.findIndex(v => readId === v.get("_id"));
      noReadCountArray.push(messages.size - index - 1);
    } else {
      noReadCountArray.push(messages.size);
    }
    return noReadCountArray
  });
  return noReadCountArray;
}
