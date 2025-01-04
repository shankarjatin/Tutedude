import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch user data using the token
      axios.get(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          console.error('Failed to fetch user data:', err);
          localStorage.removeItem('token');
          navigate('/login');
        });

      // Fetch friends list
      axios.get(`${BASE_URL}/api/friends`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setFriends(response.data);
        })
        .catch(err => {
          console.error('Failed to fetch friends:', err);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navigateToPage = (page) => {
    navigate(page); // Navigating to other pages based on the clicked button
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Welcome, {user?.username}</h1>
      <button onClick={handleLogout} className="mb-4 p-2 bg-red-500 text-white">Logout</button>

      <h2 className="text-lg mb-4">Your Friends:</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.username}>{friend.username}</li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg mb-2">Navigate to:</h3>
        <button
          onClick={() => navigateToPage('/all-users')}
          className="p-2 bg-blue-500 text-white mr-2"
        >
          All Users
        </button>
        <button
          onClick={() => navigateToPage('/friend-recommendations')}
          className="p-2 bg-yellow-500 text-white mr-2"
        >
          Friend Recommendations
        </button>
        <button
          onClick={() => navigateToPage('/friend-requests')}
          className="p-2 bg-green-500 text-white mr-2"
        >
          Friend Requests
        </button>
        <button
          onClick={() => navigateToPage('/friends')}
          className="p-2 bg-purple-500 text-white"
        >
          Friends List
        </button>
      </div>
    </div>
  );
};

export default HomePage;
