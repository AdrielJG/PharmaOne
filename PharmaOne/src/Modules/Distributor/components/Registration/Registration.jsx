import React, { useState } from 'react';
import manuImage from './manu.png';
import disImage from './dis.png';
import regImage from './reg.png';
import pharImage from './phar.png';
import backgroundImage from './Final.png'; 
import { Link } from 'react-router-dom';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const closeModal = () => {
    setCurrentStep(1);
  };

  const options = [
    { id: 'manufacturer', label: 'Manufacturer Account', img: manuImage, desc: 'You manufacture 🤯' },
    { id: 'distributor', label: 'Distributor Account', img: disImage, desc: 'You distribute 🤯' },
    { id: 'regulator', label: 'Regulator Account', img: regImage, desc: 'You regulate 🤯' },
    { id: 'pharmacy', label: 'Pharmacy Account', img: pharImage, desc: 'You sell 🤯' },
  ];

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const modalStyles = {
    height: '700px', // Set a fixed height
    width: '500px', // Set a fixed width
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
      {/* Step 1 Modal */}
      {currentStep === 1 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Registration Form</h1>
            <p className="text-gray-500 text-center mt-2">Please fill out this form with the required information</p>

            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-500 text-white text-sm">1</div>
                <span className="text-gray-700 font-medium text-sm">Account Type</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">2</div>
                <span className="text-gray-500 text-sm">Personal Information</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">3</div>
                <span className="text-gray-500 text-sm">Email Verification</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">4</div>
                <span className="text-gray-500 text-sm">Document Upload</span>
              </div>
            </div>

            <div className="mt-8 text-center">
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

      {/* Step 2 Modal */}
      {currentStep === 2 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Registration Form</h1>
            <p className="text-gray-500 text-center mt-2">Please fill out this form with the required information</p>

            {/* Progress Tracker */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">1</div>
                <span className="text-gray-500 text-sm">Account Type</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-500 text-white text-sm">2</div>
                <span className="text-gray-700 font-medium text-sm">Personal Information</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">3</div>
                <span className="text-gray-500 text-sm">Email Verification</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">4</div>
                <span className="text-gray-500 text-sm">Document Upload</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="mt-8 space-y-4" style={{marginTop: '6rem'}}>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="johndoe@mail.com"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="********"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between" style={{marginTop: '7rem'}}>
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

      {/* Step 3 Modal */}
      {currentStep === 3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Email Verification</h1>
            <p className="text-gray-500 text-center mt-2">Please verify your email address.</p>

            {/* Progress Tracker */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">1</div>
                <span className="text-gray-500 text-sm">Account Type</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">2</div>
                <span className="text-gray-700 font-medium text-sm">Personal Information</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-500 text-white text-sm">3</div>
                <span className="text-gray-500 text-sm">Email Verification</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">4</div>
                <span className="text-gray-500 text-sm">Document Upload</span>
              </div>
            </div>

            <form className="flex flex-col gap-4 mt-4" style={{marginTop: '10rem'}}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" type="text" placeholder="Enter 5 digit code" />
              </div>
            </form>

              <div className="mt-8 flex justify-between" style={{marginTop: '14rem'}}>
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

      {/* Step 4 Modal */}
      {currentStep === 4 && (
        <div className="fixed inset-0 flex items-center justify-center" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 mx-4" style={modalStyles}>
            <h1 className="text-2xl font-semibold text-center">Document Upload</h1>
            <p className="text-gray-500 text-center mt-2">Please upload the necessary documents for verification.</p>

            {/* Progress Tracker */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">1</div>
                <span className="text-gray-500 text-sm">Account Type</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">2</div>
                <span className="text-gray-500 text-sm">Personal Information</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-500 text-sm">3</div>
                <span className="text-gray-500 text-sm">Email Verification</span>
              </div>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-teal-500 text-white text-sm">4</div>
                <span className="text-gray-700 font-medium text-sm">Document Upload</span>
              </div>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-4 mt-8" style={{marginTop: '9rem'}}>
              <div>
                <label className="block text-gray-700">Upload Document1</label>
                <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" type="file" />
              </div>
              <div>
                <label className="block text-gray-700">Upload Document2</label>
                <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" type="file" />
              </div>
            </form>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between" style={{ marginTop: '8.6rem' }}>
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

      {/* Step 5 Modal */}
      {currentStep === 5 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={backgroundStyle}>
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <h1 className="text-xl font-semibold text-gray-800 text-center mb-2">Registration Complete</h1>
            <p className="text-sm text-gray-500 text-center mb-8">Thank you for registering! Your registration is complete. You will receive a confirmation email shortly.</p>

            <div className="flex justify-center mt-8">
              <Link to='/' className="bg-teal-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-700" onClick={closeModal}>
                Finish
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
