import React, { useState, useEffect, useRef } from 'react';
import { Amplify, Interactions } from 'aws-amplify';
import awsconfig from '../aws-exports';

import './Chatbot.css';

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
                <span className="close" onClick={props.onClose}>
                    &times;
                </span>
            </div>
            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div className={`message ${message.from}`} key={index}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <style>
                {`
          form {
            display: flex;
            align-items: center;
            padding: 16px;
          }

          input[type="text"] {
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 4px;
            margin-right: 8px;
          }

          button[type="submit"] {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
          }
        `}
            </style>
        </div>
    );
}

export default Chatbotfunction;
