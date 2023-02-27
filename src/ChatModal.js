import React from 'react';
import './ChatButton.css';
import Chatbotfunction from './components/Chatbot';

function ChatModal(props) {
    return (
        <div className="chat-modal">
            <div className="chat-modal-content">
                <div style={{ backgroundColor: 'white' }}>
                    {/* <span className="close" onClick={props.onClose}>
                        &times;
                    </span> */}
                    <Chatbotfunction onClose={props.onClose} />
                </div>
            </div>
        </div>
    );
}

export default ChatModal;
