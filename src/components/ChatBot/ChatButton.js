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
            <button className="chat-button" onClick={handleClick}>
                <i class="fas fa-eye"></i>
                <i class="fas fa-eye"></i>
                <span> Got a question? Ask us</span>
            </button>
            {isOpen && <ChatModal onClose={handleClose} />}
        </div>
    );
}

export default ChatButton;
