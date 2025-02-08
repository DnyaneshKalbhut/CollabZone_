import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileCard.css";
import userImage from "../components/user.jpg"; // Adjust path as needed

const API_URL = "http://localhost:5000/api"; // Update if backend runs on a different port

const ProfileCard = ({ userEmail, onClose, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) return;

      try {
        const response = await fetch(`${API_URL}/user/${userEmail}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (loading) return <p className="text-warning">Loading user data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={userImage} alt="Profile" className="profile-pic" />
        <div className="user-info">
          <h5>Hi, {user.name}</h5>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Aadhaar Card:</strong> {user.aadhaar || "Not available"}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button className="btn btn-sm btn-danger" onClick={onLogout}>
        Logout
      </button>

      {/* Close Button */}
      <button className="btn btn-sm btn-secondary" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ProfileCard;
