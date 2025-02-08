import React, { useState, useRef, useEffect } from "react";
import "../styles/Chat.css";
import { Box, Paper, TextField, IconButton, Typography, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header"; // ✅ Ensure Header remains visible
import Sidenav from "../components/Sidenav";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user")) || { name: "Guest" };

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      user: loggedInUser.name || "You",
      text: inputMessage,
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header />
      <Sidenav />

      {/* Chat Layout */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Chat Messages Container */}
        <Paper sx={{ flexGrow: 1, overflowY: "auto", p: 2, backgroundColor: "#f9f9f9" }}>
          {messages
            .filter((msg) => msg.text.toLowerCase().includes(searchTerm.toLowerCase())) // ✅ Filters messages
            .map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.user === loggedInUser.name ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: "60%",
                    backgroundColor: msg.user === loggedInUser.name ? "#1976d2" : "#eeeeee",
                    color: msg.user === loggedInUser.name ? "white" : "black",
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                    {msg.user} • {msg.time}
                  </Typography>
                </Paper>
              </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        {/* Message Input */}
        <Box component="form" onSubmit={sendMessage} sx={{ display: "flex", mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
