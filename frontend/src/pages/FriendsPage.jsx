// src/pages/FriendsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch friends list
      axios.get(`${BASE_URL}/api/friends`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setFriends(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch friends:', err);
        });
    }
  }, [navigate]);

  const handleRemoveFriend = (friendId) => {
    const token = localStorage.getItem('token');
    axios.delete(`${BASE_URL}/api/friends/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert('Friend removed successfully');
      })
      .catch(err => {
        console.error('Failed to remove friend:', err);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id} className="flex justify-between items-center mb-2">
            <span>{friend.username}</span>
            <button
              onClick={() => handleRemoveFriend(friend._id)} // Using friendId (_id) for removal
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
