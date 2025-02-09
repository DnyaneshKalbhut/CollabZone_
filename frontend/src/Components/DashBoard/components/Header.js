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
  const profileRef = useRef(null);

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
            CollabZone
          </Typography>

          {/* Profile Icon */}
          <IconButton size="large" edge="end" color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Card - Appears when showProfile is true */}
      {showProfile && (
        <div ref={profileRef} style={{ position: "absolute", top: 60, right: 10 }}>
          <ProfileCard onClose={() => setShowProfile(false)} />
        </div>
      )}
    </Box>
  );
}