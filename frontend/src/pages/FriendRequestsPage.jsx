// src/pages/FriendRequestsPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const FriendRequestsPage = () => {
  const { friendRequests, acceptFriendRequest, rejectFriendRequest } = useAuth();

  const handleAccept = (requestId) => {
    acceptFriendRequest(requestId)
      .then(() => {
        alert('Friend request accepted');
      })
      .catch((err) => console.error('Failed to accept friend request:', err));
  };

  const handleReject = (requestId) => {
    rejectFriendRequest(requestId)
      .then(() => {
        alert('Friend request rejected');
      })
      .catch((err) => console.error('Failed to reject friend request:', err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Friend Requests</h2>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((request) => (
            <li key={request.username} className="flex justify-between">
              <span>{request.username}</span>
              <button onClick={() => handleAccept(request.username)} className="bg-green-500 text-white p-2">Accept</button>
              <button onClick={() => handleReject(request.username)} className="bg-red-500 text-white p-2">Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests available.</p>
      )}
    </div>
  );
};

export default FriendRequestsPage;
