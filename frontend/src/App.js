import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Chat from "./Components/DashBoard/pages/Chat";
import DashBoard from "./Components/DashBoard/DashBoard";
import ChatHome from "./ChatAppLog/ChatHome"; // Path to the ChatHome component

const App = () => {
  const [userData, setUserData] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<SignIn setUserData={setUserData} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
        <Route path="/chat" element={<Chat />} />
       
        <Route path="/chathome" element={<ChatHome />} />

        {/* <Route path="/chatlog" element={<ChatLog />} /> */}
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;