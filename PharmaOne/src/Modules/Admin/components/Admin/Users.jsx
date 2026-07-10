import React, { useState, useEffect } from "react";

const Users = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVerifiedUsers(data.verified_users || []);
      setRejectedUsers(data.rejected_users || []);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle ban/unban actions
  const handleVerification = async (userEmail, status) => {
    try {
      const payload = {
        email: userEmail,
        verified: status,
      };

      const response = await fetch("http://localhost:5000/api/ban-unban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Server response:", error);
        throw new Error("Failed to update verification status");
      }

      const result = await response.json();
      console.log(result.message);

      // Refresh the user data
      await fetchUsers();
    } catch (error) {
      console.error("Error updating verification:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Loading user data...</h1>
      </div>
    );
  }

  return (
    <div className="p-10 bg-[#F7F8FA] h-screen overflow-y-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-700">User Management</h1>
        <p className="text-sm text-gray-500">
          List of users in the system and their roles
        </p>
      </div>

      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="Search Users..."
        />
      </div>

      {/* Verified Users Table */}
      <div className="bg-white shadow-md rounded mb-5">
        <h2 className="text-lg font-bold text-gray-700 p-3">Verified Users</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600">Username</th>
              <th className="p-3 text-sm font-medium text-gray-600">Email</th>
              <th className="p-3 text-sm font-medium text-gray-600">Role</th>
              <th className="p-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {verifiedUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 text-sm text-gray-600">{user.name}</td>
                <td className="p-3 text-sm text-gray-600">{user.email}</td>
                <td className="p-3 text-sm text-gray-600">{user.account_type}</td>
                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleVerification(user.email, 2)}
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Banned Users Table */}
      <div className="bg-white shadow-md rounded">
        <h2 className="text-lg font-bold text-gray-700 p-3">Banned Users</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-sm font-medium text-gray-600">Username</th>
              <th className="p-3 text-sm font-medium text-gray-600">Email</th>
              <th className="p-3 text-sm font-medium text-gray-600">Role</th>
              <th className="p-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rejectedUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 text-sm text-gray-600">{user.name}</td>
                <td className="p-3 text-sm text-gray-600">{user.email}</td>
                <td className="p-3 text-sm text-gray-600">{user.account_type}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleVerification(user.email, 0)}
                  >
                    Unban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
