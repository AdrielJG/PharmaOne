import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Fetch feedbacks from the API
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      const data = await response.json();
      setFeedbacks(data); // Set the array directly
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const intervalId = setInterval(fetchFeedbacks, 10000000); // Poll every second
    return () => clearInterval(intervalId);
  }, []);

  const handleReplyClick = (feedback) => {
    setSelectedFeedback(feedback);
    setIsReplyModalOpen(true);
  };

  const handleReplySubmit = async () => {
    if (!replyMessage.trim()) {
      alert('Reply message cannot be empty.');
      return;
    }

    const notification = {
      sender_mail: 'admin@gmail.com',
      user_mail: selectedFeedback.email,
      message: `Replied to - "${selectedFeedback.message}": ${replyMessage}`,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      time: new Date().toLocaleTimeString(), // HH:MM:SS format
      status: 0,
      type: 'notif',
    };

    try {
      const response = await fetch('http://localhost:5000/api/notification', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (!response.ok) {
        throw new Error('Failed to send reply.');
      }

      alert('Reply sent successfully!');
      setReplyMessage('');
      setIsReplyModalOpen(false);
      setSelectedFeedback(null);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-10 bg-[#F7F8FA] h-screen overflow-y-auto">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-700">Feedbacks and Complaints</h1>
        <p className="text-sm text-gray-500">List of feedbacks and complaints submitted by users</p>
      </div>

      {/* Feedback Table */}
      <div className="bg-white shadow-md rounded">
        {isLoading ? (
          <p className="p-4 text-gray-600 text-center">Loading feedbacks...</p>
        ) : error ? (
          <p className="p-4 text-red-600 text-center">Error: {error}</p>
        ) : feedbacks.length === 0 ? (
          <p className="p-4 text-gray-600 text-center">No feedbacks found.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">First Name</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">Last Name</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">Email</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">Message</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600 tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{feedback.firstName}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{feedback.lastName}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{feedback.email}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{feedback.message}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleReplyClick(feedback)}
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Reply to {selectedFeedback.firstName} {selectedFeedback.lastName}
            </h2>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your reply here..."
              className="w-full border border-gray-300 p-2 rounded mb-4"
              rows={4}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsReplyModalOpen(false);
                  setSelectedFeedback(null);
                  setReplyMessage('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleReplySubmit}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
