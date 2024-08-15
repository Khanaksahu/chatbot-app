import React, { useState } from 'react';
import './Chatbot.css';


const patternsResponses = {
  '(.*)hi|hello|hey(.*)': "Hello! How can I assist you with your food order or tracking today?",
  "(.*)how are you(.*)": "I'm here to help you with your food orders. How can I assist you today?",
  "(.*)my order(.*)": "You mentioned your order. Can you provide me with your tracking ID so I can give you more details?",
  "(.*)I want to(.*)": "It sounds like you want to {detail}. Can you provide more details or your tracking ID?",
  "(.*)I feel (.*)": "I'm sorry to hear that you're feeling {detail}. Is there an issue with your order that I can help resolve?",
  "(.*)I am (.*)": "How can I assist you with your food order today?",
  "(.*)what is your name(.*)": "I am your food order tracking assistant. How can I help you today?",
  "(.*)thank you|thanks|okay(.*)": "You're welcome! If there's anything else you need help with, feel free to ask.",
  "(.*)bye|goodbye(.*)": "Goodbye! It was nice assisting you. Have a great day!",
  "(.*)tell me about my order(.*)": "Please provide your tracking ID so I can give you detailed information about your order.",
  "(.*)what can you do(.*)": "I can help you track your food order, provide status updates, and assist with any order-related queries you have. How can I help you today?",
  "(.*)issue with (.*)": "I'm sorry to hear about the issue . Please provide your tracking ID and details of the problem, and I'll assist you further.",
  "(.*)order status(.*)": "To check your order status, please provide your tracking ID.",
  "(.*)change order(.*)": "Please provide your tracking ID and the changes you would like to make to your order.",
  "(.*)delivery time(.*)": "Could you please provide your tracking ID? I can then give you an estimated delivery time for your order.",
  "(.*)details about order(.*)": "Please provide your tracking ID, and I will share the details of your order.",
  "(.*)tracking id (.*)": "The status for your order : In Transit."
};

  
  const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const handleSend = () => {
      if (input.trim()) {
        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);
        const botResponse = getBotResponse(input);
        setMessages([...messages, userMessage, botResponse]);
        setInput('');
      }
    }; 
  
    const getBotResponse = (input) => {
      for (const pattern in patternsResponses) {
        const regex = new RegExp(pattern, 'i');
        const match = input.match(regex);
        if (match) {
          const response = patternsResponses[pattern];
          return { text: typeof response === 'function' ? response(match) : response, sender: 'bot' };
        }
      }
      return { text: "I'm not sure how to respond to that.", sender: 'bot' };
    };
  
    return (
        <div className="chatbot">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div className={`chatbot-message ${msg.sender}`} key={index}>
                {msg.sender === 'user' ? (
                  <>
                    <div className="chatbot-text user">{msg.text}</div>
                    <img src="/user.png" alt="user" className="chatbot-avatar" />
                  </>
                ) : (
                  <>
                    <img src="/robot.png" alt="bot" className="chatbot-avatar" />
                    <div className="chatbot-text bot">{msg.text}</div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div> 
        </div>
      );
  };
  
  export default Chatbot;
  