import React, { useState } from 'react';
import manuImage from './manu.png';
import disImage from './dis.png';
import regImage from './reg.png';
import pharImage from './phar.png';
import backgroundImage from './Final.png';
import axios from 'axios';  // Axios for HTTP requests
import { Link, useNavigate } from 'react-router-dom';  // Added useNavigate for redirection

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    accountType: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',  // New password confirmation field
    document1: null,
    document2: null,
  });
  
  const [error, setError] = useState('');

  const [errors, setErrors] = useState({
    passwordMismatch: false,  // To handle password mismatch
    invalidEmail: false,      // To handle invalid email format
    weakPassword: false,      // To handle weak password
  });
  
  const navigate = useNavigate(); // To redirect after submission

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password complexity
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // Handle next step validation and progression
  const handleNextStep = () => {
    if (currentStep === 1 && !formData.accountType) {
      setError('Please select an account type');
      return;
    }

    if (currentStep === 2) {
      const { name, email, password, confirmPassword } = formData;

      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill out all required fields');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setErrors({ ...errors, invalidEmail: true });
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setErrors({ ...errors, passwordMismatch: true });
        return;
      }

      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters long and include at least one letter, one number, and one special character');
        setErrors({ ...errors, weakPassword: true });
        return;
      }
    }

    if (currentStep === 3 && (!formData.document1 || !formData.document2)) {
      setError('Please upload both documents');
      return;
    }

    setError('');
    if (currentStep < 5) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  // Handle option click for selecting account type
  const handleOptionClick = (id) => {
    setSelectedOption(id);
    setFormData({ ...formData, accountType: id });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setErrors({ ...errors, passwordMismatch: false, weakPassword: false });  // Clear mismatch and weak password errors
    }
    if (name === 'email') {
      setErrors({ ...errors, invalidEmail: false });  // Clear invalid email error
    }
  };

  // Handle file changes for document uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Validate that passwords match
  const validatePasswords = () => {
    return formData.password === formData.confirmPassword;
  };

  // Handle form submission to API
  const handleSubmit = async () => {
    if (!validatePasswords()) {
      setErrors({ ...errors, passwordMismatch: true });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('accountType', formData.accountType);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('document1', formData.document1);
    formDataToSend.append('document2', formData.document2);

    try {
      const response = await axios.post('http://localhost:5000/api/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      handleNextStep(); // Proceed to Step 5
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to register. Please try again.');
    }
  };

  // Redirect to login after the final step
  const redirectToLogin = () => {
    setTimeout(() => {
      navigate('/login'); // Redirects to the login page after 3 seconds
    }, 3000);
  };

  // CSS and modal styling
  const modalStyles = {
    maxHeight: '90vh', 
    overflowY: 'auto',
    maxWidth: '500px',
    width: '100%',
    margin: 'auto',
    padding: '2rem',
    borderRadius: '8px',
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // Options for account type selection
  const options = [
    { id: 'Manufacturer', label: 'Manufacturer Account', img: manuImage },
    { id: 'Distributor', label: 'Distributor Account', img: disImage},
    { id: 'Regulator', label: 'Regulator Account', img: regImage },
    { id: 'Pharmacy', label: 'Pharmacy Account', img: pharImage },
  ];

  return (
    <>
      {/* Step 1 Modal */}
      {currentStep === 1 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Registration Form</h1>
            <p className="text-gray-500 text-center mt-2">Please fill out this form with the required information</p>

            {/* Account Type Selection */}
            <div className="mt-4 text-center">
              <p className="text-gray-400">Choose your account type</p>
            </div>

            <div className="mt-4 space-y-4">
              {options.map(option => (
                <div
                  key={option.id}
                  className={`flex items-center p-4 rounded-lg cursor-pointer border ${
                    selectedOption === option.id ? 'bg-teal-50 border-teal-500' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <img src={option.img} alt={`${option.label} Image`} className="h-8 w-8" />
                  <div className="ml-4">
                    <h2 className="font-semibold text-gray-700">{option.label}</h2>
                    <p className="text-gray-500 text-sm">{option.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={handleNextStep}
                disabled={!selectedOption}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 Modal */}
      {currentStep === 2 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Personal Information</h1>
            <p className="text-gray-500 text-center mt-2">Please fill out this form with the required information</p>

            {/* Form Fields */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="John Doe"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="johndoe@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.invalidEmail && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Password (6+ characters, include a number and a special character)</label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.weakPassword && (
                  <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters long and include at least one letter, one number, and one special character.</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.passwordMismatch && (
                  <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 Modal */}
      {currentStep === 3 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Upload Documents</h1>
            <p className="text-gray-500 text-center mt-2">Please upload your required documents</p>

            {/* Document Upload */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700">Licence (Manufacturor/Distributor/Pharmacy/Regulator)</label>
                <input
                  type="file"
                  name="document1"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Aadhaar Card (.pdf format)</label>
                <input
                  type="file"
                  name="document2"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 Modal */}
      {currentStep === 4 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Review & Submit</h1>
            <p className="text-gray-500 text-center mt-2">Please review your information before submitting</p>

            {/* Review Information */}
            <div className="mt-6 space-y-4">
              <div className="border-b border-gray-200 py-2">
                <p className="text-gray-600">Account Type: <span className="text-gray-900">{formData.accountType}</span></p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p className="text-gray-600">Name: <span className="text-gray-900">{formData.name}</span></p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p className="text-gray-600">Email: <span className="text-gray-900">{formData.email}</span></p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p className="text-gray-600">Password: <span className="text-gray-900">********</span></p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p className="text-gray-600">Licence: <span className="text-gray-900">{formData.document1 ? formData.document1.name : 'Not uploaded'}</span></p>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p className="text-gray-600">Aadhaar: <span className="text-gray-900">{formData.document2 ? formData.document2.name : 'Not uploaded'}</span></p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5 Modal */}
      {currentStep === 5 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Thank You!</h1>
            <p className="text-gray-500 text-center mt-2">Your registration was successful. You will be redirected to the login page shortly.</p>

            {redirectToLogin()}
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;