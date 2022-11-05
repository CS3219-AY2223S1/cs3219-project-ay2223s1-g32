import React from "react";
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
var socket = socketClient(SERVER);
socket.on("connection", () => {
  console.log(`I'm connected with the back-end`);
});

function ChatPage() {
  var socket = socketClient(SERVER);

  return <div classname="App"></div>;
}

export default ChatPage;
