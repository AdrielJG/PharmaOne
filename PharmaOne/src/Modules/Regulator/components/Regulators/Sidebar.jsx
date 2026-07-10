import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { menuItems } from './menuItems';
import ProfileImage from '../../assets/profile.jpg';
import Dots from '../../assets/svgs/threedot.png';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon
import { FiLogOut } from 'react-icons/fi'; // Logout icon

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    if (!isDropdownOpen) {
      navigate('/profile');
    }
  };

  const handleDotsClick = (e) => {
    e.stopPropagation(); // Prevent click event from triggering profile click
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

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
    <div className='Sidebar w-[270px] bg-[#283342] h-screen relative'>
      <div className='Logo w-full text-white flex items-center pl-6 bg-[#1D242E] gap-2 h-16'>
        <img src={logo} alt="Logo" className='w-12' />
        <h1 className='text-xl font-semibold'>PharmaChain</h1>
      </div>

      <div className='w-full py-0 text-white'>
        <div
          className='Profile w-full px-5 py-3 hover:bg-[#1D242E] transition duration-300 ease-in-out cursor-pointer relative'
          onClick={handleProfileClick}
        >
          <div className='flex items-center gap-3 p-1'>
            <img src={ProfileImage} alt="Profile" className='w-12 rounded-full' />
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col'>
                <h4>Group 14</h4>
                <h5 className='text-xs text-[#FED600]'>Regulator</h5>
              </div>
              <div
                className='cursor-pointer relative'
                onClick={handleDotsClick}
              >
                <img src={Dots} alt="Menu" />
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className='absolute right-5 top-14 bg-white shadow-lg rounded-md w-44 py-2 z-10'>
              <div
                onClick={() => handleDropdownClick('/profile')}
                className='px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer'
              >
                <FaUserCircle className='text-lg text-black' />
                <span className='text-black'>My Profile</span>
              </div>
              <hr className='border-t border-gray-200 my-1' />
              <div
                onClick={() => handleDropdownClick('/login')}
                className='px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer text-red-500'
              >
                <FiLogOut className='text-lg' />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>

        <div className='Nav w-full'>
          <ul className='flex flex-col'>
            {menuItems.map((item) => (
              <li key={item.label} className='text-sm'>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'py-3 px-5 flex gap-3 bg-[#009099]'
                      : 'py-3 px-5 flex gap-3 hover:bg-[#009099]'
                  }
                >
                  <img src={item.icon} alt={item.label} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
