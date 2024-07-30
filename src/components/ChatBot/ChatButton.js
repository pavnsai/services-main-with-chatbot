import React, { useState } from 'react';
import './ChatButton.css';
import ChatModal from './ChatModal';

function ChatButton() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <i className="fas fa-eye"></i>
            <i className="fas fa-eye"></i>
            <button className="chat-button" onClick={handleClick}>
                <span> Got a question? Ask us</span>
            </button>
            {isOpen && <ChatModal onClose={handleClose}/>}
        </div>
    );
}

export default ChatButton;
