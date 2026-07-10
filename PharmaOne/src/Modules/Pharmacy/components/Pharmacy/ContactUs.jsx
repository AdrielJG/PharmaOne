import React, { useState } from 'react';
import GlobalStyle from './GlobalStyle';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setStatus(''); // Reset status message

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Feedback submitted successfully!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setStatus(errorData.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setStatus('Unable to submit feedback. Please try again later.');
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-12 text-center max-w-xl">
          <h1 className="text-5xl font-extrabold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            We’re here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>

        {/* Content Section: Cards and Form */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mb-12 gap-8">
          {/* Information Section (3 Cards) */}
          <div className="flex flex-col w-full md:w-1/3 space-y-6">
            <div className="p-6 bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800">Phone Support</h2>
              <p className="mt-4 text-gray-600">
                Call us: +1 (800) 123-4567 <br />
                Monday to Friday, 9AM - 6PM
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800">Email Support</h2>
              <p className="mt-4 text-gray-600">
                Email us: support@pharmachain.com <br />
                We typically respond within 24 hours
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800">Visit Us</h2>
              <p className="mt-4 text-gray-600">
                KC College, Churchgate,<br /> Mumbai, Maharashtra <br /> 400005
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-xl rounded-lg p-10 w-full md:w-2/3 mx-auto transform transition-all hover:shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 transition-all duration-200"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 transition-all duration-200"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 transition-all duration-200"
                  placeholder="Email"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">
                  What can we help you with?
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 transition-all duration-200"
                  placeholder="Type your message here..."
                  rows="5"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-teal-600 transition-transform duration-200 transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display Status Message */}
            {status && (
              <div className="mt-4 text-center text-lg text-gray-700">
                {status}
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full max-w-7xl">
          <iframe
            title="KC College Churchgate, Mumbai"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15037.511801038766!2d72.8258!3d18.9395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e0d5e38f73%3A0x9e7f4bfb925c27b6!2sKC+College!5e0!3m2!1sen!2sin!4v1692293989520"
            width="100%"
            height="500"
            className="rounded-lg shadow-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
