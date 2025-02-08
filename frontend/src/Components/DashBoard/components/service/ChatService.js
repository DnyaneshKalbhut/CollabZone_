import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const ChatService = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  // Start the connection when the component mounts
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chat", {
      skipNegotiation: true, // ✅ Force WebSockets
      transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
  

    connection
      .start()
      .then(() => {
        console.log("Connection established!");
        setConnection(connection);
      })
      .catch((error) => {
        console.error("Error establishing connection:", error);
      });

    // Listening for messages from the server
    connection.on("ReceiveMessage", (user, message, messageTime) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user, message, messageTime },
      ]);
    });

    // Listening for connected users from the server
    connection.on("ConnectedUser", (users) => {
      setConnectedUsers(users);
    });

    return () => {
      // Cleanup when the component is unmounted
      connection
        .stop()
        .catch((error) => console.error("Error stopping connection:", error));
    };
  }, []);

  // Join Room
  const joinRoom = async (user, room) => {
    if (connection) {
      try {
        await connection.invoke("JoinRoom", { user, room });
      } catch (error) {
        console.error("Error joining room:", error);
      }
    }
  };

  // Send Message
  const sendMessage = async (message) => {
    if (connection) {
      try {
        await connection.invoke("SendMessage", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Leave Chat
  const leaveChat = async () => {
    if (connection) {
      try {
        await connection.stop();
        console.log("Connection stopped.");
      } catch (error) {
        console.error("Error leaving chat:", error);
      }
    }
  };

  return {
    connection,
    messages,
    connectedUsers,
    joinRoom,
    sendMessage,
    leaveChat,
  };
};

export default ChatService;
