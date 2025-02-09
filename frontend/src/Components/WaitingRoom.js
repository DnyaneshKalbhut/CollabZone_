import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WaitingRoom.css'; // Import the new CSS file

const predefinedChatRooms = [
    'game',
    'music',
    'songs',
    'education',
    'tech',
    'news'
];

const WaitingRoom = ({ JoinChatRoom }) => {
    const [userName, setUserName] = useState('');
    const [chatRoom, setChatRoom] = useState('');
    const [isCustomChatRoom, setIsCustomChatRoom] = useState(true);

    const handleJoin = () => {
        JoinChatRoom(userName, chatRoom);
    };

    const handleChatRoomChange = (e) => {
        const selectedChatRoom = e.target.value;
        if (selectedChatRoom === 'custom') {
            setIsCustomChatRoom(true);
            setChatRoom('');
        } else {
            setIsCustomChatRoom(false);
            setChatRoom(selectedChatRoom);
        }
    };

    return (
        <div className="waiting-room-container">
            <div className="waiting-room-box">
                <h1 className="waiting-room-title">Welcome to ChatRoom</h1>
                <div className="waiting-room-input-group">
                    <input
                        type="text"
                        className="waiting-room-input"
                        value={userName}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <select
                        className="waiting-room-select"
                        onChange={handleChatRoomChange}
                        value={isCustomChatRoom ? 'custom' : chatRoom}
                    >
                        <option value="custom">Create New Room</option>
                        {predefinedChatRooms.map(room => (
                            <option key={room} value={room}>
                                {room}
                            </option>
                        ))}
                    </select>
                    {isCustomChatRoom && (
                        <input
                            type="text"
                            className="waiting-room-input"
                            value={chatRoom}
                            required
                            onChange={(e) => setChatRoom(e.target.value)}
                            placeholder="Room name"
                        />
                    )}
                </div>
                <button className="waiting-room-button" onClick={handleJoin}>
                    Join Chat Room
                </button>
            </div>
        </div>
    );
}

WaitingRoom.propTypes = {
    JoinChatRoom: PropTypes.func.isRequired
};

export default WaitingRoom;
