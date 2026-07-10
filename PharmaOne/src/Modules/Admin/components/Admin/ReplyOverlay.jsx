import React, { useState } from 'react';

const ReplyOverlay = ({ user, isOpen, onClose }) => {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Add the new message to the chat history
    setChats([...chats, { user: "You", message: newMessage }]);

    // Clear the text area after sending
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        
        {/* User Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        
        {/* Scrollable Chat Section */}
        <div className="overflow-y-auto max-h-96 border rounded-lg p-4 mb-6">
          {chats.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          ) : (
            chats.map((chat, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold text-gray-800">{chat.user}:</p>
                <p className="text-gray-700">{chat.message}</p>
              </div>
            ))
          )}
        </div>
        
        {/* Reply Section */}
        <div className="flex items-center">
          <textarea 
            className="w-4/5 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your reply here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button 
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyOverlay;
