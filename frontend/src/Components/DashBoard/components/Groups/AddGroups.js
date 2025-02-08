import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChatService from "../service/ChatService";
import "./AddGroups.css"; // Import the new CSS file

export default function AddGroups() {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState(""); // For storing the group name
  const [userName, setUserName] = useState(""); // For storing the user name

  const navigate = useNavigate();

  const { joinRoom } = ChatService();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGroupName("");
    setUserName("");
  };

  const handleAdd = async () => {
    // Creating the object with the user and room info
    const userRoomInfo = {
      user: userName,
      room: groupName,
    };

    // Log the object in the desired format
    console.log(userRoomInfo);

    try {
      // Trigger joinRoom function from ChatService
      await joinRoom(userName, groupName);
      console.log(`Joined room: ${groupName} as ${userName}`);
    } catch (error) {
      console.error("Error joining room:", error);
    }

    handleClose();
    navigate("/chat");
  };

  // Disable the "Add" button if either userName or groupName is empty
  const isAddButtonDisabled = !userName || !groupName;

  return (
    <div>
      {/* Button to open the "Create Group" modal */}
      <button onClick={handleClickOpen} className="create-group-button">
        Join Group
      </button>

      {/* Modal Dialog (only visible when open is true) */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-semibold mb-4">Join New Group</h2>

            <form onSubmit={(e) => e.preventDefault()} className="form">
              {/* User Name Input */}
              <div>
                <label
                  htmlFor="userName"
                  className="block text-left font-medium"
                >
                  User Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Group Name Input */}
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-left font-medium"
                >
                  Group Name
                </label>
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="input-field"
                  required
                />
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
                <button
                  type="submit"
                  onClick={handleAdd}
                  className="add-button"
                  disabled={isAddButtonDisabled} // Disable if fields are empty
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
