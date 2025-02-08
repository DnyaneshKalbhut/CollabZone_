import React from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
// import AddGroups from "../components/Groups/AddGroups";
import Meetings from "../components/Meetings/Meetings"; // Import Meetings component
import "../styles/Groups1.css"; // Import the CSS file
import ChatButton from "../../ChatButton";

const Groups1 = () => {
  return (
    <div className="container">
      <Header />
      <div className="mainContent">
        <Sidenav />
        <div className="leftSection">
          {/* Centered Group Names Text */}
          <span className="groupText">Here Group Names will be mentioned</span>

          {/* AddGroups Component contains the actual functionality for joining groups */}
          {/* <AddGroups /> */}
          <ChatButton />

          {/* Meetings Component to generate Google Meet link */}
          <Meetings />

          <div className="spacer"></div>
        </div>
      </div>
    </div>
  );
};

export default Groups1;
