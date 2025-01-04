// src/pages/FriendRecommendationsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const FriendRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch friend recommendations
      axios.get(`${BASE_URL}/api/friends/recommendations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setRecommendations(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch recommendations:', err);
        });
    }
  }, [navigate]);

  const handleSendRequest = (userId) => {
    const token = localStorage.getItem('token');
    axios.post(`${BASE_URL}/api/friends/requests/${userId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('Friend request sent successfully');
      })
      .catch(err => {
        console.error('Failed to send friend request:', err);
        alert('Error sending friend request');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Friend Recommendations</h2>
      <ul>
        {recommendations.map((user) => (
          <li key={user._id} className="flex justify-between items-center mb-2">
            <span>{user.username}</span>
            <button
              onClick={() => handleSendRequest(user._id)} // Using userId (_id) for friend request
              className="bg-blue-500 text-white p-2 rounded"
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
