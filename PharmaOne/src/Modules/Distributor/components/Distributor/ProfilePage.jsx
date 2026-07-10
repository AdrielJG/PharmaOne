import React from 'react';
import Profile from '../../assets/profile.jpg'; // Import your profile image

const PersonalInfo = () => {
  return (
    <div className="p-10 flex justify-between">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">Personal info</h1>
        <div className="bg-white shadow p-6 rounded-lg">
          {/* Personal Info Fields */}
          <div className="mb-4">
            <label className="block text-gray-700">Legal name</label>
            <div className="flex justify-between items-center">
              <span>Nankani</span>
              <button className="text-blue-500">Edit</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email address</label>
            <div className="flex justify-between items-center">
              <span>s****l@gmail.com</span>
              <button className="text-blue-500">Edit</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone numbers</label>
            <div className="flex justify-between items-center">
              <span>Not provided</span>
              <button className="text-blue-500">Add</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Account Type</label>
            <div className="flex justify-between items-center">
              <span>Distributor</span>
              <button className="text-blue-500">Edit</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <div className="flex justify-between items-center">
              <span>Not provided</span>
              <button className="text-blue-500">Edit</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Emergency contact</label>
            <div className="flex justify-between items-center">
              <span>Not provided</span>
              <button className="text-blue-500">Add</button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Government ID</label>
            <div className="flex justify-between items-center">
              <span>Not provided</span>
              <button className="text-blue-500">Add</button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="w-1/4 flex justify-center mt-16">
        <div className="flex flex-col items-center">
          <img src={Profile} alt="Profile" className="rounded-full w-50 h-50 mb-4"/>
          <button className="text-blue-500">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
