
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chathome");
  };

  return <button  onClick={handleClick}>Open Chat App</button>;
};

export default ChatButton;
