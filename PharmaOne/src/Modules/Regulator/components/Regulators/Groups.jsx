import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
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

  const handleCreateGroup = () => {
    const newGroup = {
      name: `Group ${String.fromCharCode(65 + groups.length)}`,
      members: 0,
      memberImages: [],
    };
    setGroups([...groups, newGroup]);
  };

  const handleGroupClick = () => {
    navigate('/chat'); // Navigate to /chat when group is clicked
  };

  return (
    <div className="p-10 bg-[#F7F8FA] h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-700">Groups</h1>
        <button
          onClick={handleCreateGroup}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          + Create Group
        </button>
      </div>

      <div className="bg-white shadow-md rounded">
        {groups.map((group, index) => (
          <div
            key={index}
            className="p-4 flex justify-between items-center border-b border-gray-200 cursor-pointer"
            onClick={handleGroupClick}
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
    </div>
  );
};

export default Groups;