import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      navigate("/"); // Redirect to login if no user data
    }
  }, [userData, navigate]);

  const handleLogout = () => {
    setUserData(null); // Clear user data
    navigate("/signin"); // Redirect to sign in page
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message/spinner
  }

  return (
    <div className="profile-card">
      <h1>CollabZone</h1>
      <div className="card-header">
        <h2>{userData.fullName}</h2>
      </div>
      <div className="card-body">
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Aadhar Number:</strong> {userData.aadharNumber}</p>
      </div>
      <div className="card-footer">
        <button onClick={handleLogout} className="logout-button">
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
