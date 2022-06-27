import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useChat = (roomId,username) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      query: { roomId,username },
    });
    socketRef.current.on("newMessages", (message) => {
      const incomingMessages = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessages]);

    });
    socketRef.current.on("roomData", (data) => {
      setUsers(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody, username) => {
    socketRef.current.emit("newMessages", {
      body: messageBody,
      senderId: socketRef.current.id,
      sender: username,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    });
  };

  return { messages, sendMessage, users };
};

export default useChat;
