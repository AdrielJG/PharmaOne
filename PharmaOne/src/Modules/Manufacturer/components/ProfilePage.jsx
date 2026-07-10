import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa"; // Import the pencil icon
import defaultProfilePic from "../assets/profile.jpeg"; // Default profile picture
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Modal Component for displaying the profile picture
const ProfilePicModal = ({ imageUrl, onClose }) => {
  const modalRef = useRef(null);

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full"
      >
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

const PersonalInfo = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(defaultProfilePic); // State to manage profile picture
  const [showProfilePicModal, setShowProfilePicModal] = useState(false); // State to manage modal visibility

  const profileOptionsRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  // Close profile options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileOptionsRef.current &&
        !profileOptionsRef.current.contains(event.target)
      ) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const bodyText = await response.text(); // Read raw response text
        console.log("Response body:", bodyText);

        if (response.ok) {
          const data = JSON.parse(bodyText); // Parse the body if it's valid JSON
          console.log("Fetched user data:", data);
          setUserData(data);
          // Set profile picture from API if available, otherwise use default
          setProfilePic(data.profile_pic || defaultProfilePic);
        } else {
          console.error("API Error:", response.status, response.statusText);
          console.error("Error response text:", bodyText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit updated data to API
  const handleSave = async (field) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: updatedData[field] }),
      });

      if (response.ok) {
        setUserData((prev) => ({ ...prev, [field]: updatedData[field] }));
        setIsEditing((prev) => ({ ...prev, [field]: false }));
      } else {
        console.error("Failed to update user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Handle profile picture click
  const handleProfilePicClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Set the new profile picture preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle upload new profile picture
  const handleUploadProfilePic = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    formData.append("email", userData.email); // Send email to use as filename

    try {
      const response = await fetch("http://localhost:5000/api/users/upload-profile-pic", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile picture uploaded:", data);
        setProfilePic(data.profilePic); // Update profile picture with the new URL
        setShowProfileOptions(false); // Hide options after upload
      } else {
        console.error("Failed to upload profile picture:", response.statusText);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logged out successfully");
        navigate("/login"); // Redirect to login page after logout
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Render editable fields
  const renderField = (label, field, editable = true) => {
    let value = userData[field] || "Not provided";
    // Capitalize the account type
    if (field === "account_type") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    return (
      <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <div className="flex justify-between items-center">
          {isEditing[field] ? (
            <input
              type="text"
              value={updatedData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="border rounded p-1 flex-1 mr-2"
            />
          ) : (
            <span>{value}</span>
          )}
          {editable && (
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (isEditing[field]) {
                  handleSave(field);
                } else {
                  setIsEditing((prev) => ({ ...prev, [field]: true }));
                  setUpdatedData((prev) => ({ ...prev, [field]: value }));
                }
              }}
            >
              <FaPencilAlt /> {/* Pencil icon */}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10 flex flex-col items-center">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-8 relative">
        <img
          src={profilePic}
          alt="Profile"
          className="rounded-full w-40 h-40 mb-4 cursor-pointer"
          onClick={handleProfilePicClick}
        />
        {showProfileOptions && (
          <div
            ref={profileOptionsRef}
            className="absolute top-48 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2 border border-gray-200"
          >
            <button
              className="text-blue-500 hover:text-blue-700 text-left"
              onClick={() => setShowProfilePicModal(true)} // Open profile picture in modal
            >
              View Profile Pic
            </button>
            <label className="text-blue-500 hover:text-blue-700 cursor-pointer text-left">
              Upload New Profile Pic
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {selectedFile && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleUploadProfilePic}
              >
                Save
              </button>
            )}
          </div>
        )}
      </div>

      {/* Personal Info Section */}
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Personal Info</h1>
        <div className="bg-white shadow p-6 rounded-lg">
          {renderField("User Name", "name")}
          {renderField("Email Address", "email", false)}
          {renderField("Phone Number", "phone")}
          {renderField("Account Type", "account_type", false)}
          {renderField("Address", "address")}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Profile Picture Modal */}
      {showProfilePicModal && (
        <ProfilePicModal
          imageUrl={profilePic}
          onClose={() => setShowProfilePicModal(false)}
        />
      )}
    </div>
  );
};

export default PersonalInfo;