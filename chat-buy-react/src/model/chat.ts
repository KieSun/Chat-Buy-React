interface ChatModel {
    chatUserName: string
    // 当前聊天列表
    // currentChatList: List([]),
    // 当前聊天 ID
    currentMessageId: string,
    // 所有消息列表
    // messageList: List([]),
    // 当前用户 ID
    userId: string,
    // 未读消息总数
    noReadCount: number,
    // 未读消息数组，对应每个消息
    // noReadCounts: List([])
}