// src/pages/SearchUsersPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SearchUsersPage = () => {
  const { searchUsers, sendFriendRequest } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) return;

    searchUsers(query)
      .then((response) => setResults(response.data))
      .catch((err) => console.error('Search failed:', err));
  };

  const handleSendRequest = (username) => {
    sendFriendRequest(username)
      .then(() => {
        alert(`Friend request sent to ${username}`);
      })
      .catch((err) => console.error('Failed to send friend request:', err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Search Users</h2>
      <input
        type="text"
        className="block p-2 mb-4 border border-gray-300"
        placeholder="Search for users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="w-full p-2 bg-blue-500 text-white"
      >
        Search
      </button>

      <ul className="mt-4">
        {results.map((user) => (
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

export default SearchUsersPage;
