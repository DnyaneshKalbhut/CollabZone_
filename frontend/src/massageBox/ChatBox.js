import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi'; // Ensure react-icons is installed

const ChatBox = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="p-2 shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 ">
            <div className="flex items-end max-w-4xl mx-auto space-x-2">
                <div className="relative flex-grow">
                    <textarea
                        className="w-full p-2 text-gray-800 placeholder-gray-500 bg-white resize-none rounded-2xl focus:outline-none"
                        rows="1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        style={{ maxHeight: '120px', minHeight: '50px' }}
                    />
                    <button
                        className="absolute p-2 mt-2 text-white transition duration-300 bg-indigo-500 rounded-full right-2 hover:bg-indigo-600 focus:outline-none"
                        onClick={handleSend}
                    >
                        <FiSend className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

ChatBox.propTypes = {
    sendMessage: PropTypes.func.isRequired
};

export default ChatBox;
