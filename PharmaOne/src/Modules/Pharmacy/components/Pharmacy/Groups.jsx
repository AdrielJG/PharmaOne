import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [refreshGroups, setRefreshGroups] = useState(false); // Track group refresh
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/get-session-email', {
        credentials: "include",
      });
      if (!response.ok) throw new Error('Failed to fetch current user email');
      const data = await response.json();
      if (!data.error) setCurrentUserEmail(data.email);
    } catch (error) {
      console.error('Error fetching current user email:', error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchGroupsAndUsers = async () => {
    try {
      const usersResponse = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        credentials: "include",
      });
      const usersData = await usersResponse.json();
      setUsers(usersData.verified_users);

      const groupsResponse = await fetch("http://localhost:5000/api/my-groups", {
        method: "GET",
        credentials: "include",
      });
      const groupsData = await groupsResponse.json();
      setGroups(groupsData.groups);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchGroupsAndUsers();
  }, [refreshGroups]); // Re-fetch when refreshGroups changes

  const openCreateGroupModal = () => setIsCreateGroupModalOpen(true);
  const closeCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
    setGroupName('');
    setSelectedUsers([]);
  };

  const createGroupInBackend = async (newGroup) => {
    try {
      const response = await fetch('http://localhost:5000/api/groups', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup),
      });
      if (!response.ok) throw new Error('Failed to create group');
      return await response.json();
    } catch (error) {
      console.error('Error creating group in backend:', error);
    }
  };

  const handleCreateGroup = async () => {
    const today = new Date();
    const currentDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const newGroup = {
      name: groupName,
      members: [...selectedUsers.map((user) => user._id), currentUserEmail],
      date: currentDate,
    };
    const savedGroup = await createGroupInBackend(newGroup);
    if (savedGroup) {
      setRefreshGroups((prev) => !prev); // Trigger refresh
    }
    closeCreateGroupModal();
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const handleGroupClick = (groupId) => {
    if (!groupId) {
      console.error("Group ID is undefined or invalid");
      return;
    }
    navigate(`/chat/${groupId}`, { state: { groupId } });
  };
  
  return (
    <div className="p-10 bg-[#F7F8FA] h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-700">Groups</h1>
        <button onClick={openCreateGroupModal} className="bg-red-500 text-white px-4 py-2 rounded">
          + Create Group
        </button>
      </div>
  
      <div className="bg-white shadow-md rounded">
        {groups.map((group, index) => {
          console.log("Group data:", group); // Debugging log
          return (
            <div
              key={group.gid}
              className="p-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
              onClick={() => handleGroupClick(group.gid)} // Call with group ID
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{group.name}</h2>
                <p className="text-sm text-gray-500">Members: {group.members.length}</p>
              </div>
              <div className="flex -space-x-2">
                {group.memberImages?.slice(0, 5).map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={image || "https://via.placeholder.com/150"}
                    alt={`Member ${imgIndex + 1}`}
                  />
                ))}
                {group.members.length > 5 && (
                  <span className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 text-xs flex items-center justify-center">
                    +{group.members.length - 5}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
  
      {isCreateGroupModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl mx-auto p-6 relative shadow-lg rounded">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeCreateGroupModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Create New Group</h2>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-medium">Group Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 text-sm font-medium">Invite Users</label>
              <div className="overflow-y-auto max-h-60 mt-2">
                {users.map((user, index) => (
                  <div
                    key={user._id || index}
                    className={`flex items-center justify-between p-2 border-b ${
                      selectedUsers.includes(user) ? 'bg-blue-100' : 'bg-white'
                    }`}
                  >
                    <span>{user.name}</span>
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        selectedUsers.includes(user) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                      }`}
                      onClick={() => handleUserSelect(user)}
                    >
                      {selectedUsers.includes(user) ? 'Remove' : 'Invite'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreateGroup}>
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
