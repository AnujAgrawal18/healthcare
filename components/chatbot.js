"use client"
import React, { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const toggleChatbot = () => setIsOpen(!isOpen);
  
    const handleSendMessage = async () => {
      if (!input.trim()) return;
  
      const userMessage = { sender: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
        
      try{
        const response = await fetch('/api/chat', { method: "POST", body: JSON.stringify({ input: input }), headers: { 'content-type': 'application/json' } });
        let b = await response.json()
        b.forEach(element => {
            const botMessage = { sender: 'bot', text: element.title };
        setMessages(prev => [...prev, botMessage]);
        });
      } catch (error) {
        const botMessage = { sender: 'bot', text: 'Something went wrong. Please try again later.' };
        setMessages(prev => [...prev, botMessage]);
      }
  
      setInput('');
    };
  
    return (
      <div className="fixed bottom-5 right-5 z-50">
        {/* Chatbot Icon */}
        {!isOpen && (
          <div
            className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer shadow-lg"
            onClick={toggleChatbot}
          >
            💬
          </div>
        )}
  
        {/* Chatbot Window */}
        {isOpen && (
          <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-blue-500 text-white flex justify-between items-center px-4 py-2">
              <h3 className="text-lg font-semibold">Chatbot</h3>
              <button onClick={toggleChatbot} className="text-xl">✖</button>
            </div>
  
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-md ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-200 text-black self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
  
            {/* Input Box */}
            <div className="flex items-center p-3 border-t bg-gray-50">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default Chatbot