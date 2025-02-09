import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileCard.css";
import userImage from "./user.jpg";

const ProfileCard = ({ onClose }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    aadhar: "",
    profilePic: userImage,
  });

  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:44312/api/auth/user/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser({
          name: data.fullName || "Unknown",
          email: data.email || "Not Available",
          aadhar: data.aadhaar || "Not Available",
          profilePic: data.profilePic || userImage,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Clear user data
    
    onClose(); // Ensure this doesn't interfere
    navigate("/"); // Navigate to SignIn page
    window.location.reload(); // Force re-render to ensure redirect
  };
  
  

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <div className="user-info">
          <h5>Hi, {user.name}</h5>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Aadhar-Card:</strong> {user.aadhar}</p>
        </div>
      </div>
      <button className="btn btn-sm logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;