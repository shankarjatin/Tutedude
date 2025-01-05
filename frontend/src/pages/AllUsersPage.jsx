import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch all users
      axios.get(`${BASE_URL}/api/friends/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch users:', err);
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

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleSendRequest(user._id)} // Using userId (_id) for friend request
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
