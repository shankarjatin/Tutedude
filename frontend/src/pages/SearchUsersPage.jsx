import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import UserCard from '../components/UserCard'; // Import UserCard component

const SearchUsersPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handles the search and API call
  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    const token = localStorage.getItem('token'); // Get the token from localStorage
    axios
      .get(`${BASE_URL}/api/friends/search?query=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Set the results with the initial requestSent value of false
        setResults(response.data.map((user) => ({ ...user, requestSent: false })));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Search failed:', err);
        setLoading(false);
      });
  };

  // Sends friend request and updates the UI
  const handleSendRequest = (username) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    axios
      .post(
        `${BASE_URL}/api/friends/requests/${username}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert(`Friend request sent to ${username}`);
        // Update the requestSent state for that user to disable the button
        setResults((prevResults) =>
          prevResults.map((user) =>
            user.username === username ? { ...user, requestSent: true } : user
          )
        );
      })
      .catch((err) => {
        console.error('Failed to send friend request:', err);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Search Users</h2>

      {/* Search Input */}
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

      {/* Loading State */}
      {loading && <div className="mt-4">Loading...</div>}

      {/* Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {results.length > 0 ? (
          results.map((user) => (
            <UserCard
              key={user.username}
              username={user.username}
              interests={user.interests}
              onSendRequest={() => handleSendRequest(user.username)}
              requestSent={user.requestSent || false} // Disable button if requestSent is true
            />
          ))
        ) : (
          <div>No users found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchUsersPage;
