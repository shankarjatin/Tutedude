// src/pages/FriendsPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const FriendsPage = () => {
  const { friends, removeFriend } = useAuth();

  const handleRemoveFriend = (friendId) => {
    removeFriend(friendId)
      .then(() => {
        alert(`Friend ${friendId} removed successfully`);
      })
      .catch((err) => console.error('Failed to remove friend:', err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.username} className="flex justify-between">
            <span>{friend.username}</span>
            <button onClick={() => handleRemoveFriend(friend.username)} className="bg-red-500 text-white p-2">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
