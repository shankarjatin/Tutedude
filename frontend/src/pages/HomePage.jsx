import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const HomePage = () => {
  const { user, token, logout } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get('/api/friends', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setFriends(response.data))
        .catch(error => console.error(error));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Welcome, {user?.username}</h1>
      <button onClick={logout} className="mb-4 p-2 bg-red-500 text-white">Logout</button>
      <h2 className="text-lg">Friends List:</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.username}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
