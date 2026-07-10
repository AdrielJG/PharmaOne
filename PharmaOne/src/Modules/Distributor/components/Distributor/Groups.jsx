import React, { useState } from 'react';
import ChatInterface from './ChatInterface'; // Import your ChatInterface component

const Groups = () => {
  // Initial groups data
  const [groups, setGroups] = useState([
    {
      name: 'Group I',
      members: 5,
      memberImages: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
    },
    {
      name: 'Group II',
      members: 3,
      memberImages: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
    },
  ]);

  // State for modal visibility and selected group
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Function to open the modal
  const openModal = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
  };

  // Function to add a new group
  const handleCreateGroup = () => {
    const newGroup = {
      name: `Group ${String.fromCharCode(65 + groups.length)}`,
      members: 0,
      memberImages: [],
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="p-10 bg-[#F7F8FA] h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-700">Groups</h1>
        <button
          onClick={handleCreateGroup}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          + Create Group
        </button>
      </div>

      {/* Groups List */}
      <div className="bg-white shadow-md rounded">
        {groups.map((group, index) => (
          <div
            key={index}
            className="p-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
            onClick={() => openModal(group)}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{group.name}</h2>
              <p className="text-sm text-gray-500">Members: {group.members}</p>
            </div>
            <div className="flex -space-x-2">
              {group.memberImages.slice(0, 5).map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={image}
                  alt={`Member ${imgIndex + 1}`}
                />
              ))}
              {group.memberImages.length > 5 && (
                <span className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 text-xs flex items-center justify-center">
                  +{group.memberImages.length - 5}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full max-w-4xl mx-auto p-6 relative shadow-lg rounded">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
            {/* Render the ChatInterface component as an overlay */}
            <ChatInterface group={selectedGroup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
