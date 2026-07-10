import React, { useState, useEffect } from 'react';

const Notification = ({ onMarkAllAsRead }) => {
  const initialNotifications = [
    { id: 1, title: 'Distribution', date: 'Mar 4', sender: 'Bender Rodriguez - DesignDrops', isRead: false },
    { id: 2, title: 'Team Meeting', date: 'Mar 5', sender: 'Leela - Planet Express', isRead: false },
    { id: 3, title: 'New Assignment', date: 'Mar 6', sender: 'Fry - Delivery Boy', isRead: false },
    // Add more notifications here
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    setNotifications(updatedNotifications);

    // Check if all notifications are read
    if (updatedNotifications.every(notification => notification.isRead)) {
      onMarkAllAsRead();
    }
  };

  return (
    <div className='p-8 flex-1'>
      <h2 className='text-2xl font-semibold mb-6'>New for you</h2>
      <div className='space-y-6'>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex justify-between items-center p-4 bg-white shadow rounded ${notification.isRead ? 'opacity-50' : ''}`}
          >
            <div className='flex items-center gap-4'>
              <div className='text-[#FED600]'>📦</div>
              <div>
                <p className='font-medium'>{notification.title}</p>
                <p className='text-sm text-gray-500'>{notification.sender} - {notification.date}</p>
              </div>
            </div>
            {!notification.isRead && (
              <div
                className='text-blue-600 cursor-pointer'
                onClick={() => handleMarkAsRead(notification.id)}
              >
                Mark as read
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
