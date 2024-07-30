import React, { useState, useEffect, useRef } from 'react';
import { Amplify, Interactions } from 'aws-amplify';
import awsconfig from '../../aws-exports';

import './Chatbot.scss';

Amplify.configure(awsconfig);

function Chatbotfunction(props) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const sendMessage = async (event) => {
        event.preventDefault();
        if (!inputText.trim()) return;

        // Send the user's input text to Amazon Lex
        const response = await Interactions.send('OrderFlowers_dev', inputText);

        // Add the response message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputText, from: 'user' },
        ]);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.message, from: 'bot' },
        ]);
        setInputText('');
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>EasyBot</h2>
                <span className="close-button" onClick={props.onClose}>
                    &times;
                </span>
            </div>
            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div
                    className={`message ${message.from} ${message.loading ? 'loading' : ''}`}
                key={index}
            >
                {message.text}
            </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="chatbot-form">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    className="chatbot-input"
                    onChange={(event) => setInputText(event.target.value)}
                />
                <button type="submit" className="chatbot-submit-button">Send</button>
            </form>
        </div>
    );
}

export default Chatbotfunction;
