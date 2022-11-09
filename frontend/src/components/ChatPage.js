import React from "react";
import ChatRoom from "./src/ChatRoom/ChatRoom";

const ChatPage = () => {
  // update the roomid to match the id between the users so they in the same room and won't match with other users
  return <ChatRoom roomid="1" username="number1" />;
};

export default ChatPage;
