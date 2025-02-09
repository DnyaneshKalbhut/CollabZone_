import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ChatRoom.css'; // Import the new CSS file

const ChatRoom = ({ usermessages }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [usermessages]);

    return (
        <div className="chat-room-container">
            {usermessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.isSystem ? 'system' : 'user'}`}>
                    <strong>{msg.user}: </strong>{msg.message}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

ChatRoom.propTypes = {
    usermessages: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            isSystem: PropTypes.bool.isRequired
        })
    ).isRequired
};

export default ChatRoom;
 