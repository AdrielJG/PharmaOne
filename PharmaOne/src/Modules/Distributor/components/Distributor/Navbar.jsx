import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { WiSunrise } from 'react-icons/wi';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Format date and time
  const formatDate = currentTime.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const formatTime = currentTime.toLocaleTimeString();

  // Determine icon based on time of day
  const getIcon = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return <WiSunrise className="text-orange-500" />; // Morning
    if (hour < 17) return <FaSun className="text-yellow-500" />;     // Afternoon
    return <FaMoon className="text-blue-500" />;                     // Evening
  };

  // Define route keywords and paths
  const routes = {
    dashboard: '/dashboard',
    inventory: '/inventory',
    reports: '/reports',
    "medicine list": '/inventory/medicinelist',
    "medicine details": '/inventory/medicinelist/:id',
    "add medicine": '/inventory/medicinelist/addmedicine',
    "medicine groups": '/inventory/medicinegroups',
    configuration: '/configuration',
    compliance: '/compliance',
    groups: '/groups',
    orders: '/orders',
    profile: '/profile',
    notifications: '/notifications',
    track: '/track',
    disorder: '/disorder',
    dispatch: '/dispatch',
    contact: '/contactus',
    chat: '/chat',
    sales: '/sales',
  };

  // Handle search input and display suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredSuggestions = Object.keys(routes).filter((route) =>
        route.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      // Select the first suggestion if none is highlighted
      const suggestionToSelect = selectedIndex === -1 ? suggestions[0] : suggestions[selectedIndex];
      if (suggestionToSelect) {
        handleSuggestionClick(suggestionToSelect);
      }
    }
  };

  // Navigate to selected route on suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    navigate(routes[suggestion]);
  };

  return (
    <div className='w-full px-10 py-4 bg-white shadow h-16 relative'>
      <div className='w-full flex justify-between items-center h-full'>
        {/* Search Bar */}
        <div className='w-5/12 relative'>
          <form className='w-full'>
            <input
              type="text"
              className='w-full px-4 py-2 outline-none bg-gray-200 rounded'
              placeholder="Search for anything here..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />  
          </form>
          {/* Suggestions Dropdown */}
          {searchQuery && suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-white shadow-lg rounded border border-gray-300 z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    index === selectedIndex ? 'bg-gray-200' : ''
                  }`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className='flex items-center space-x-6'>
          {/* Date, Time, and Greeting */}
          <div className='text-right flex items-center space-x-2'>
            <div className='flex flex-col items-center'>
              {getIcon()}
            </div>
            <div>
              <div className='text-sm flex items-center'>
                <span>{getGreeting()}</span>
              </div>
              <div className='text-xs text-gray-500'>{`${formatDate} · ${formatTime}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
