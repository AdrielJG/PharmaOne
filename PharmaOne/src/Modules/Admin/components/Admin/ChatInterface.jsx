import React, { useState, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ChatInterface = () => {
  const location = useLocation();
  const groupId = location.state?.groupId;
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupDetails, setGroupDetails] = useState(null);
  const [error, setError] = useState(null);
  const [userCache, setUserCache] = useState({}); // Cache to store email-to-name mappings

  // Fetch user name by email
  const fetchUserName = async (email) => {
    if (userCache[email]) {
      return userCache[email];
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users?email=${email}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user name");
      }

      const data = await response.json();
      const name = data.name || email; // Fallback to email if name not found
      setUserCache((prevCache) => ({ ...prevCache, [email]: name }));
      return name;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return email; // Fallback to email in case of an error
    }
  };

  // Fetch group details
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/group/${groupId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.error || "Failed to fetch group details");
        }

        const data = await response.json();
        setGroupDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  // Fetch messages for the group
  // Inside the existing fetchMessages function, make sure to include logic for appending new messages
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/groups/${groupId}/messages`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  if (groupId) {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000); // Refresh every 1 second

    return () => clearInterval(interval); // Clear interval on component unmount
  }
}, [groupId]);


  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/api/groups/${groupId}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: newMessage }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const savedMessage = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: savedMessage.sender, message: newMessage, timestamp: new Date().toISOString() },
        ]);
        setNewMessage('');
        window.location.reload(); 
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#E5E9EC]">
      {/* Chat Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
        <h3
          className="text-xl font-semibold text-gray-700 cursor-pointer"
          onClick={() => navigate('/groups')}
        >
          Groups &gt; {groupDetails?.name || "Loading..."}
        </h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">Team Members: {groupDetails?.memberslength || 0}</span>
          <FaEllipsisH className="text-gray-500" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-[#CBD5E1] p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const currentMessageDate = new Date(message.timestamp).toLocaleDateString();
            const previousMessageDate =
              index > 0 ? new Date(messages[index - 1].timestamp).toLocaleDateString() : null;

            const isSameSenderAsPrevious =
              index > 0 && messages[index - 1].sender === message.sender;
            const isSameDateAsPrevious = currentMessageDate === previousMessageDate;

            return (
              <div key={index} className="flex flex-col space-y-1">
                {/* Show date once per day */}
                {!isSameDateAsPrevious && (
                  <div className="text-center text-sm text-gray-500 my-2">
                    {currentMessageDate}
                  </div>
                )}

                <div className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} items-start`}>
                  <div className="flex flex-col space-y-1 max-w-xs">
                    {/* Show user name */}
                    {!isSameSenderAsPrevious && (
                      <span className="text-sm text-gray-600 font-medium">
                        {userCache[message.sender] || message.sender}
                      </span>
                    )}
                    <div className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-sm">
                      <span>{message.message}</span>
                    </div>
                  </div>
                  {/* Timestamp on the right */}
                  <span className="text-xs text-gray-500 self-end ml-2">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-3 border-t border-gray-300 flex items-center">
        <input
          type="text"
          className="flex-1 p-3 bg-gray-100 rounded-md shadow-inner focus:outline-none"
          placeholder="Start typing..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 px-4 py-1 bg-[#0073C6] text-white rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
