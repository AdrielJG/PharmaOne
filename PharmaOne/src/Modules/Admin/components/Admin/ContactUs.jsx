import React from 'react';
import GlobalStyle from './GlobalStyle';

const ContactUs = () => {
  return (
    <>
      <GlobalStyle />
      <div className="p-10">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-500 mt-4">
            We’re here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>

        {/* Information Section */}
        <div className="flex justify-between mb-12">
          <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800">Phone Support</h2>
            <p className="mt-4 text-gray-600">
              Call us: +1 (800) 123-4567 <br />
              Monday to Friday, 9AM - 6PM
            </p>
          </div>
          <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg mx-6 transform transition-transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800">Email Support</h2>
            <p className="mt-4 text-gray-600">
              Email us: support@pharmachain.com <br />
              We typically respond within 24 hours
            </p>
          </div>
          <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800">Visit Us</h2>
            <p className="mt-4 text-gray-600">
              123 PharmaChain St.,<br />
              Springfield, USA
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-10 w-2/3 max-w-2xl mx-auto mb-12">
          <form>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
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
        </div>

        {/* Map Section */}
        <div className="w-full flex justify-center">
        <iframe
        title="KC College Churchgate Mumbai"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15037.511801038766!2d72.8258!3d18.9395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e0d5e38f73%3A0x9e7f4bfb925c27b6!2sKC+College!5e0!3m2!1sen!2sin!4v1692293989520"
        width="100%"
        height="400"
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
