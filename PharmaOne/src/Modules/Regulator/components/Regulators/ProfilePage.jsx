import React, { useState } from 'react';
import Profile from '../../assets/profile.jpg'; // Import your profile image

const CompanyProfile = () => {
  // State for the company's information
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Nankani Enterprises',
    email: 'info@nankani.com',
    phone: '',
    industry: 'Regulating',
    address: '1234 Industrial Ave, Business City, BC 56789',
    website: 'www.nankani.com',
    taxId: '',
    registrationNumber: ''
  });

  // State for profile image
  const [profileImage, setProfileImage] = useState(Profile);

  // State to track the current field being edited
  const [editingField, setEditingField] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Function to handle the edit button click
  const handleEdit = (field) => {
    setEditingField(field);
    setInputValue(companyInfo[field]);
  };

  // Function to handle the save action
  const handleSave = () => {
    setCompanyInfo({
      ...companyInfo,
      [editingField]: inputValue
    });
    setEditingField(null);
  };

  // Function to handle the input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle profile image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="p-10 flex justify-between">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">Company Profile</h1>
        <div className="bg-white shadow p-6 rounded-lg">
          {/* Company Info Fields */}
          {Object.keys(companyInfo).map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <div className="flex justify-between items-center">
                {editingField === field ? (
                  <>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                    <button onClick={handleSave} className="text-green-500 ml-4">Save</button>
                  </>
                ) : (
                  <>
                    <span>{companyInfo[field] || 'Not provided'}</span>
                    <button onClick={() => handleEdit(field)} className="text-blue-500 ml-4">
                      {companyInfo[field] ? 'Edit' : 'Add'}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="w-1/4 flex justify-center mt-16">
        <div className="flex flex-col items-center">
          <img src={profileImage} alt="Company Logo" className="rounded-full w-50 h-50 mb-4" />
          <input
            type="file"
            id="imageUpload"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            accept="image/*"
          />
          <button
            className="text-blue-500"
            onClick={() => document.getElementById('imageUpload').click()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
