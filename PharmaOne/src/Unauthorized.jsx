import React from 'react';
import { FaMedkit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get-user-role', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch user role');
      
      const data = await response.json();
      
      switch(data.account_type.toLowerCase()) {
        case 'manufacturer':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/dashboardA');
          break;
        case 'pharmacy':
          navigate('/dashboardP');
          break;
        default:
          navigate('/login');
      }
    } catch (error) {
      console.error('Redirect error:', error);
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="bg-gray-800 p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-600 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <FaMedkit className="h-24 w-24 text-red-500 mx-auto mb-6 animate-bounce" />
        <h1 className="text-4xl font-extrabold mb-4 text-red-400 tracking-wide drop-shadow-lg">Access Denied 🚫</h1>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          You do not have the necessary permissions to access this page.
        </p>
        <p className="text-md text-gray-400 italic mb-6">
          If you believe this is a mistake, please contact support.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;