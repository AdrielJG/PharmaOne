import React, { useState, useEffect } from 'react';
import manuImage from './manu.png';
import disImage from './dis.png';
import regImage from './reg.png';
import pharImage from './phar.png';
import backgroundImage from './Final.png'; 
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for redirection
import axios from 'axios';

const Registration2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    accountType: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
    document1: null,
    document2: null,
  });
  
  const [error, setError] = useState(''); // For handling errors like password mismatch
  const navigate = useNavigate(); // To handle redirection after registration success

  // Validate password complexity
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // Fetch the email from session
  useEffect(() => {
    fetch('http://localhost:5000/api/get-session-email', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.email) {
          setFormData(prevData => ({ ...prevData, email: data.email }));
        } else {
          console.error('Error fetching session email:', data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching session email:', error);
      });
  }, []);
  
  const handleNextStep = () => {
    // Validation for Step 1: Ensure account type is selected
    if (currentStep === 1 && !formData.accountType) {
      setError('Please select an account type');
      return;
    }
  
    // Validation for Step 2: Ensure all required fields are filled and passwords match
    if (currentStep === 2) {
      const { name, password, confirmPassword } = formData;
      
      if (!name || !password || !confirmPassword) {
        setError('Please fill out all required fields');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      } 
      
      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters long, include a number, and a special character');
        return;
      }
    }
  
    // Validation for Step 4: Ensure documents are uploaded
    if (currentStep === 4 && (!formData.document1 || !formData.document2)) {
      setError('Please upload both documents');
      return;
    }
  
    // If validation passes, clear the error and proceed to the next step
    setError('');
  
    if (currentStep < 5) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

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
      handleNextStep(); // Proceed to the next step (Success)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleOptionClick = (id) => {
    setSelectedOption(id);
    setFormData({ ...formData, accountType: id });
  };

  const redirectToLogin = () => {
    setTimeout(() => {
      navigate('/login'); // Redirects to the login page after 3 seconds
    }, 3000);
  };
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

  return (
    <>
      {/* Step 1: Account Type Selection */}
      {currentStep === 1 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Registration Form</h1>
            <p className="text-gray-500 text-center mt-2">Please fill out this form with the required information</p>

            <div className="mt-8 text-center">
              <p className="text-gray-400">Choose your account type</p>
            </div>

            <div className="mt-4 space-y-4">
              {[
                { id: 'manufacturer', label: 'Manufacturer Account', img: manuImage},
                { id: 'distributor', label: 'Distributor Account', img: disImage},
                { id: 'regulator', label: 'Regulator Account', img: regImage},
                { id: 'pharmacy', label: 'Pharmacy Account', img: pharImage},
              ].map(option => (
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

            <div className="mt-8 flex justify-center">
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

      {/* Step 2: Personal Information */}
      {currentStep === 2 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Personal Information</h1>

            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
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
                  value={formData.email}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  disabled
                />
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
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                onClick={handlePrevStep}
              >
                Previous
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

      {/* Step 3: Summary */}
      {currentStep === 3 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Summary</h1>

            <div className="mt-8 space-y-4">
              <p><strong>Account Type:</strong> {formData.accountType}</p>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Password:</strong> {formData.password.replace(/./g, '*')}</p>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                onClick={handlePrevStep}
              >
                Previous
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

      {/* Step 4: Document Upload */}
      {currentStep === 4 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Upload Documents</h1>

            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-gray-700">Document 1</label>
                <input
                  type="file"
                  name="document1"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Document 2</label>
                <input
                  type="file"
                  name="document2"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                onClick={handlePrevStep}
              >
                Previous
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

      {/* Step 5: Registration Success */}
      {currentStep === 5 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Verification Process Started</h1>
            <p className="text-gray-500 text-center mt-2">
              Your account is under verification. You will receive an email with further instructions shortly.
            </p>
            <p className="text-gray-500 text-center mt-4">Redirecting to login page...</p>

            {/* Call redirectToLogin function to initiate redirection */}
            {redirectToLogin()}
          </div>
        </div>
      )}
    </>
  );
};

export default Registration2;