// Chat.js

import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Chat.css';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { user_id: 'unique_id', message: input };
    setMessages([...messages, { text: input, fromUser: true }]);
    setInput('');
  
    try {
      const response = await axios.post('http://localhost:5000/chat', userMessage); // Update the URL here
      setMessages([...messages, { text: response.data.response, fromUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <div className="chat-container">
      <div className="message-area">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromUser ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={sendMessage} className="text-appointment-btn">Send</button>
    </div>
  );
}

export default Chat;
