import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBox,
  FaFileAlt,
  FaUsers,
  FaTruck,
  FaBell,
  FaChartLine,
  FaQuestionCircle,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import logo from '../../assets/Logo.png';
import ProfileImage from '../../assets/profile.jpeg';
import Dots from '../../assets/svgs/threedot.png';
import { AiFillNotification, AiOutlineSetting } from 'react-icons/ai';
import { MdGroup } from 'react-icons/md';

const menuItems = [
  { label: 'Dashboards', path: '/dashboardP', icon: <FaChartLine /> },
  { label: 'Inventory', path: '/inventoryP', icon: <FaBox /> },
  { label: 'Reports', path: '/reportsP', icon: <FaFileAlt /> },
  { label: 'Order Now', path: '/ordernowP', icon: <FaUsers /> },
  { label: 'Ongoing Orders', path: '/ordersP', icon: <FaTruck /> },
  { label: 'Notifications', path: '/notificationsP', icon: <FaBell /> },
  { label: 'Help & Support', path: '/contactusP', icon: <FaQuestionCircle /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePic: ProfileImage, // Default profile picture
    username: 'Admin', // Default username
    accountType: 'Administrator', // Default account type
  });
  const dropdownRef = useRef(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          // Capitalize the first letter of account_type
          const capitalizedAccountType =
            data.account_type.charAt(0).toUpperCase() + data.account_type.slice(1);
          setProfileData({
            profilePic: data.profile_pic || ProfileImage, // Use fetched profile picture or default
            username: data.name || 'Admin', // Use fetched username or default
            accountType: capitalizedAccountType || 'Administrator', // Use capitalized account type or default
          });
        } else {
          console.error('Failed to fetch profile data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileClick = () => {
    if (!isDropdownOpen) {
      navigate('/profileP');
    }
  };

  const handleDotsClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (path) => {
    setDropdownOpen(false); // Close the dropdown
    navigate(path); // Navigate to the specified path
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          const unreadNotifications = data.filter(
            (notification) => notification.status === 0
          );
          setHasUnreadNotifications(unreadNotifications.length > 0);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="Sidebar w-[270px] bg-[#283342] h-screen flex flex-col text-white">
      <div className="Logo w-full text-white flex items-center pl-6 bg-[#1D242E] gap-2 h-16 shadow-md">
        <img src={logo} alt="Logo" className="w-12" />
        <h1 className="text-xl font-bold tracking-wide">PharmaChain</h1>
      </div>

      <div
        className="Profile w-full px-5 py-4 bg-gradient-to-r from-[#1D242E] to-[#283342] hover:from-[#283342] hover:to-[#1D242E] transition duration-300 ease-in-out relative cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="flex items-center gap-3">
          <img
            src={profileData.profilePic}
            alt="Profile"
            className="w-12 h-12 rounded-full shadow-lg"
          />
          <div className="flex flex-col">
            <h4 className="font-semibold text-lg">{profileData.username}</h4>
            <h5 className="text-sm text-[#FED600] font-light">
              {profileData.accountType}
            </h5>
          </div>
          <div className="ml-auto cursor-pointer" onClick={handleDotsClick}>
            <img src={Dots} alt="Menu" />
          </div>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-5 top-14 bg-white shadow-lg rounded-md w-44 py-2 z-10"
          >
            <div
              onClick={() => handleDropdownClick('/profileP')}
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
            >
              <FaUserCircle className="text-lg text-black" />
              <span className="text-black">My Profile</span>
            </div>
            <hr className="border-t border-gray-200 my-1" />
            <div
              onClick={handleLogout}
              className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer text-red-500"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>

      <div className="Nav w-full flex-1 flex flex-col">
        <ul className="flex flex-col h-full">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <li>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'py-4 px-6 flex gap-4 bg-[#009099] items-center justify-start font-semibold text-white rounded-lg shadow-md'
                      : 'py-4 px-6 flex gap-4 items-center justify-start text-gray-300 hover:bg-[#1D242E] hover:text-white rounded-lg transition-all duration-200'
                  }
                >
                  <div className="icon text-lg hover:scale-105 hover:rotate-6 transition-all duration-200 relative">
                    {item.icon}
                    {item.label === 'Notifications' && hasUnreadNotifications && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                    )}
                  </div>
                  <span className="text-base">{item.label}</span>
                </NavLink>
              </li>
              {index === 4 && <hr className="border-t border-gray-600 my-1 mx-6" />}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="SidebarFooter bg-[#1D242E] text-gray-300 px-6 py-4">
        <h4 className="font-semibold text-lg">Need Help?</h4>
        <p className="text-sm mt-2">
          Mail Us at{' '}
          <a href="mailto:rahulsonawane280305@gmail.com" className="text-[#009099]">
            Click here to Mail Us!!!
          </a>
        </p>
        <div className="mt-4 text-xs text-gray-500">
          PharmaChain © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;