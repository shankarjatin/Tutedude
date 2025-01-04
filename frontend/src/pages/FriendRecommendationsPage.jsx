// src/pages/FriendRecommendationsPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const FriendRecommendationsPage = () => {
  const { friendRecommendations, sendFriendRequest } = useAuth();

  const handleSendRequest = (username) => {
    sendFriendRequest(username)
      .then(() => {
        alert(`Friend request sent to ${username}`);
      })
      .catch((err) => console.error('Failed to send friend request:', err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Friend Recommendations</h2>
      <ul>
        {friendRecommendations.map((user) => (
          <li key={user.username} className="flex justify-between">
            <span>{user.username}</span>
            <button
              onClick={() => handleSendRequest(user.username)}
              className="bg-blue-500 text-white p-2"
            >
              Send Request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRecommendationsPage;
