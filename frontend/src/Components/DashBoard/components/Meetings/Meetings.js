import React, { useState } from "react";
import "./Meetings.css"; // Create a separate CSS file for meetings if needed

export default function Meetings() {
  const [open, setOpen] = useState(false);
  const [meetLink, setMeetLink] = useState(""); // Store the user-inputted Meet link

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMeetLink(""); // Clear the input when modal closes
  };

  const handleGenerateMeetLink = () => {
    // Google Meet link for creating a new meeting room
    const newMeetLink = "https://meet.google.com/new";

    // Open the Meet link directly in a new tab
    window.open(newMeetLink, "_blank");
  };

  const handleJoinMeet = () => {
    if (meetLink) {
      // Open the user-provided Meet link in a new tab
      window.open(meetLink, "_blank");
    } else {
      alert("Please enter a valid Google Meet link.");
    }
  };

  return (
    <div>
      {/* Button to open the "Create Meet" modal */}
      <button onClick={handleClickOpen} className="create-meet-button">
        Create Meet Link
      </button>

      {/* Modal Dialog (only visible when open is true) */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-semibold mb-4">
              Create Google Meet Link
            </h2>

            <div>
              <button
                onClick={handleGenerateMeetLink}
                className="generate-button"
              >
                Generate Meet Link
              </button>
            </div>

            <div className="join-meet-section">
              <h3 className="join-meet-header">Join a Meeting</h3>

              {/* Input for entering Meet link */}
              <input
                type="text"
                placeholder="Enter Google Meet Link"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                className="meet-link-input"
              />

              <button onClick={handleJoinMeet} className="join-button">
                Join Meeting
              </button>
            </div>

            {/* Action Buttons */}
            <div className="actions">
              <button
                type="button"
                onClick={handleClose}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
