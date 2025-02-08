import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppStore } from "../appStore";
import ProfileCard from "./ProfileCard";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Header() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const [showProfile, setShowProfile] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const profileRef = useRef(null);

  // Retrieve user email from sessionStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUserEmail(storedUser?.email || null);
  }, []);

  // Toggle Profile Card
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  // Close ProfileCard when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* Sidebar Toggle Button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            COLLABZONE
          </Typography>

          {/* Profile Icon (Always Visible) */}
          <IconButton size="large" edge="end" color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Card - Shows User Data if Logged In */}
      {showProfile && (
        <div ref={profileRef} style={{ position: "absolute", top: 60, right: 10 }}>
          {userEmail ? (
            <ProfileCard userEmail={userEmail} onClose={() => setShowProfile(false)} />
          ) : (
            <div className="profile-card">
              <p className="text-danger">Login required to view profile.</p>
              <button className="btn btn-sm btn-primary" onClick={() => setShowProfile(false)}>
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </Box>
  );
}
