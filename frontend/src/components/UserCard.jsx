import React from 'react';

const UserCard = ({
  username,
  interests,
  mutualFriends,
  onSendRequest,
  requestSent,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* User Card Content */}
      <div className="flex flex-col items-center">
        {/* Avatar Placeholder */}
        <div className="w-20 h-20 bg-[#8174A0] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
          {username[0]}
        </div>
        <h3 className="text-xl font-semibold text-[#441752] mb-2">{username}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Interests: {interests?.join(', ') || 'No interests listed'}
        </p>

        {/* Display Mutual Friends if available */}
        {mutualFriends > 0 ? (
          <div className="text-sm text-gray-600 mb-4">
            <strong>Mutual Friends:</strong>
            <span> {mutualFriends}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mb-4">No mutual friends.</p>
        )}

        {/* Send Request Button */}
        {requestSent ? (
          <button
            disabled
            className="bg-gray-400 text-white p-3 rounded-lg cursor-not-allowed"
          >
            Request Sent
          </button>
        ) : (
          <button
            onClick={onSendRequest}
            className="bg-[#441752] text-white p-3 rounded-lg hover:bg-[#8174A0] transition duration-300"
          >
            Send Request
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
