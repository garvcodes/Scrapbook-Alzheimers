"use client";
import React, { useState } from 'react';


function ChatBotComponent() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-display">
                {/* Display GPT's response in a chat-like format */}
                {answer && <div className="chat-bubble bot">{answer}</div>}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleQuestionSubmit}>Send</button>
            </div>
        </div>
    );
}

export default ChatBotComponent;
