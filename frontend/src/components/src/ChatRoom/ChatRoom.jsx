import React, { useState } from "react";
import { Divider as ChakraDivider } from "@chakra-ui/react";
import Messages from "./Messages";
import Footer from "./Footer";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import socketIOClient from "socket.io-client";
import { useRef, useEffect } from "react";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:8008";

const ChatRoom = (props) => {
  const username = props.username;
  const roomId = props.roomid;
  const [peerusername, setPeerUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const socketRef = useRef();
  // handle connection to server then handle updating the messages to new message state
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    socketRef.current.emit("username", username);
    socketRef.current.on("connected", (receivedusername) => {
      console.log(receivedusername);
      if (receivedusername !== username) {
        setPeerUsername(receivedusername);
      }
    });
  }, [username, peerusername]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  // when the button pressed handlesendmessage calls send message to send the message
  const handleSendMessage = () => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: newMessage,
      senderId: socketRef.current.id,
    });
    setNewMessage("");
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex w="100%" h="100%" justify="center" align="center">
        <Flex w="70%" h="90%" flexDir="column">
          <Flex w="100%">
            <Avatar
              size="lg"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            >
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Flex flexDirection="column" mx="5" justify="center">
              <Text fontSize="lg" fontWeight="bold">
                {peerusername}
              </Text>
              <Text color="green.500">Online</Text>
            </Flex>
          </Flex>
          <ChakraDivider
            w="100%"
            borderBottomWidth="3px"
            color="black"
            mt="5"
          />
          <Messages messages={messages} />
          <ChakraDivider
            w="100%"
            borderBottomWidth="3px"
            color="black"
            mt="5"
          />
          <Footer
            inputMessage={newMessage}
            setInputMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default ChatRoom;
