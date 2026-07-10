import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi team!', sender: 'received' },
    { text: 'Anyone on for lunch today?', sender: 'received' },
    { text: 'I am down for whatever!', sender: 'sent' },
    { text: 'Agreed', sender: 'sent' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'sent' }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#E5E9EC]">
      {/* Chat Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
        <button 
          className="text-xl font-semibold text-gray-700 cursor-pointer" 
          onClick={() => navigate('/groups')}
        >
          Groups &gt; Group1
        </button>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">7 team members</span>
          <FaEllipsisH className="text-gray-500" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-[#CBD5E1] p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`${
                  message.sender === 'sent' ? 'bg-[#0073C6] text-white' : 'bg-white text-gray-800'
                } px-4 py-2 rounded-md shadow-sm max-w-xs`}
              >
                <span>{message.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 border-t border-gray-300 flex items-center">
        <input
          type="text"
          className="flex-1 p-3 bg-gray-100 rounded-md shadow-inner focus:outline-none"
          placeholder="Start typing..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-4 px-4 py-2 bg-[#0073C6] text-white rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;