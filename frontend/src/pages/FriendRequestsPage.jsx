// src/pages/FriendRequestsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const FriendRequestsPage = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch friend requests
      axios.get(`${BASE_URL}/api/friends/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setFriendRequests(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch friend requests:', err);
        });
    }
  }, [navigate]);

  const handleAcceptRequest = (requestId) => {
    const token = localStorage.getItem('token');
    axios.post(`${BASE_URL}/api/friends/requests/${requestId}/accept`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('Friend request accepted');
      })
      .catch(err => {
        console.error('Failed to accept friend request:', err);
      });
  };

  const handleRejectRequest = (requestId) => {
    const token = localStorage.getItem('token');
    axios.post(`${BASE_URL}/api/friends/requests/${requestId}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('Friend request rejected');
      })
      .catch(err => {
        console.error('Failed to reject friend request:', err);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Friend Requests</h2>
      <ul>
        {friendRequests.map((request) => (
          <li key={request._id} className="flex justify-between items-center mb-2">
            <span>{request.username}</span>
            <button
              onClick={() => handleAcceptRequest(request._id)} // Using requestId (_id) for accept
              className="bg-green-500 text-white p-2 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => handleRejectRequest(request._id)} // Using requestId (_id) for reject
              className="bg-red-500 text-white p-2 rounded"
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequestsPage;
