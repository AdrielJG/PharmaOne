import React, { useEffect, useState } from 'react';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Helper function to format the date
  const formatDate = (dateString, time) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' }; // Format: 10 Dec 2024
    return `${date.toLocaleDateString(undefined, options)} - ${time}`;
  };

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.error('Unexpected response format:', data);
          setNotifications([]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id ? { ...notification, status: 1 } : notification
        )
      );
      window.location.reload();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Handle notification click to expand
  const handleNotificationClick = (notification) => {
    setExpandedNotification(notification._id === expandedNotification ? null : notification._id);
  };

  // Handle Accept invite
  const acceptInvite = async (id) => {
    try {
      console.log(`Invite accepted for notification ID: ${id}`);
      markAsRead(id); // Optionally mark it as read once accepted
    } catch (error) {
      console.error('Error accepting invite:', error);
    }
  };

  // Handle Decline invite
  const declineInvite = async (id) => {
    try {
      console.log(`Invite declined for notification ID: ${id}`);
      markAsRead(id); // Optionally mark it as read once declined
    } catch (error) {
      console.error('Error declining invite:', error);
    }
  };

  return (
    <div className="p-8 flex-1">
      <h2 className="text-2xl font-semibold mb-6">New for you</h2>
      {notifications.length > 0 ? (
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex flex-col bg-white shadow rounded transition-all duration-300 ${
                expandedNotification === notification._id ? 'p-6' : 'p-4 max-h-28'
              } ${notification.status === 1 ? 'opacity-50' : ''}`}
              onClick={() => handleNotificationClick(notification)}
              style={{ cursor: 'pointer' }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-[#FED600]">📦</div>
                  <div>
                    <p className="font-medium">{notification.sender_mail}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(notification.date, notification.time)}
                    </p>
                  </div>
                </div>
                {notification.status === 0 && expandedNotification !== notification._id && (
                  <div
                    className="text-blue-600 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card expansion
                      markAsRead(notification._id);
                    }}
                  >
                    Mark as read
                  </div>
                )}
              </div>
              <div
                className={`mt-4 text-sm text-gray-700 ${
                  expandedNotification === notification._id ? '' : 'line-clamp-2'
                }`}
              >
                {notification.message}
              </div>

              {/* Display buttons only for "invite" type notifications */}
              {notification.type === 'invite' && expandedNotification === notification._id && (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card expansion
                      acceptInvite(notification._id);
                    }}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card expansion
                      declineInvite(notification._id);
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;
