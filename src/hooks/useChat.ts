import { generateRoomId } from "@/util/util";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Message {
  roomId: string;
  authorId: string;
  authorName: string;
  receiverId: string;
  text: string;
  createdAt: Date;
}

const useChat = (roomId: string | null, userId: string) => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = io(BASE_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    if (roomId) {
      newSocket.emit("join_room", roomId);
    }

    newSocket.on("receive_message", (message: Message) => {
      if (user?._id === message?.receiverId)
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageText: string, receiverId: string) => {
    if (socket) {
      const messageData = {
        roomId: roomId ? roomId : generateRoomId(receiverId, userId),
        authorId: userId,
        authorName: user?.name,
        receiverId,
        text: messageText,
        createdAt: new Date(),
      };

      console.log(messageData);

      socket.emit("send_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    }
  };

  return { messages, sendMessage, setMessages };
};

export default useChat;
