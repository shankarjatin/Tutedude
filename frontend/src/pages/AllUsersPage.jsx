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
      axios
        .get(`${BASE_URL}/api/friends/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsers(response.data.map((user) => ({ ...user, requestSent: false }))); // Add requestSent flag
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch users:', err);
        });
    }
  }, [navigate]);

  const handleSendRequest = (userId) => {
    const token = localStorage.getItem('token');
    axios
      .post(
        `${BASE_URL}/api/friends/requests/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, requestSent: true } : user
          )
        );
        alert('Friend request sent successfully');
      })
      .catch((err) => {
        console.error('Failed to send friend request:', err);
        alert('Error sending friend request');
      });
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-6 bg-[#F9F6E6] min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-[#441752] mb-6">
        All Users
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* User Card Content */}
            <div className="flex flex-col items-center">
              {/* Avatar Placeholder */}
              <div className="w-20 h-20 bg-[#8174A0] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user.username[0]}
              </div>
              <h3 className="text-xl font-semibold text-[#441752] mb-2">
                {user.username}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Interests: {user.interests?.join(', ') || 'No interests listed'}
              </p>
              {user.mutualFriends !== undefined && (
                <p className="text-sm text-gray-600 mb-4">
                  Mutual Friends: {user.mutualFriends || 0}
                </p>
              )}

              {/* Request Button */}
              {user.requestSent ? (
                <button
                  disabled
                  className="bg-gray-400 text-white p-3 rounded-lg cursor-not-allowed"
                >
                  Request Sent
                </button>
              ) : (
                <button
                  onClick={() => handleSendRequest(user._id)}
                  className="bg-[#441752] text-white p-3 rounded-lg hover:bg-[#8174A0] transition duration-300"
                >
                  Send Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
