import React from "react";
import ChatRoom from "./src/ChatRoom/ChatRoom";

const ChatPage2 = () => {
  // update the roomid to match the id between the users so they in the same room and won't match with other users
  return <ChatRoom roomid="1" username="number2" />;
};

export default ChatPage2;
