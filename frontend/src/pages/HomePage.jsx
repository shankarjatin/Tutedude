import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

// Import the pages (components)
import AllUsersPage from './AllUsersPage';
import FriendRecommendationsPage from './FriendRecommendationsPage';
import FriendRequestsPage from './FriendRequestsPage';
import FriendsPage from './FriendsPage';
import SearchUsersPage from './SearchUsersPage';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [currentPage, setCurrentPage] = useState('all-users'); // Default page is 'All Users'
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
    setCurrentPage(page); // Set current page based on the button clicked
  };

  return (
    <div className="p-8 bg-[#EFB6C8] min-h-screen">
      {/* Header with user information and logout */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 mb-8 flex justify-between items-center">
        {/* Left Side: User Info */}
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-[#8174A0] rounded-full flex items-center justify-center">
            {/* User Avatar (Placeholder Circle) */}
            <span className="text-xl font-semibold text-white">{user?.username?.[0]}</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#441752]">{user?.username}</h2>
            <p className="text-sm text-gray-600">Friends: {friends.length}</p>
          </div>
        </div>

        {/* Right Side: Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 px-4 bg-[#441752] text-white rounded-lg hover:bg-[#8174A0] transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto flex justify-center space-x-4 mb-8">
        <button
          onClick={() => navigateToPage('all-users')}
          className="px-6 py-3 bg-[#A888B5] text-[#441752] rounded-lg shadow-md hover:bg-[#8174A0] transition duration-300"
        >
          All Users
        </button>
        <button
          onClick={() => navigateToPage('friend-recommendations')}
          className="px-6 py-3 bg-[#8174A0] text-white rounded-lg shadow-md hover:bg-[#A888B5] transition duration-300"
        >
          Friend Recommendations
        </button>
        <button
          onClick={() => navigateToPage('friend-requests')}
          className="px-6 py-3 bg-[#A888B5] text-[#441752] rounded-lg shadow-md hover:bg-[#8174A0] transition duration-300"
        >
          Friend Requests
        </button>
        <button
          onClick={() => navigateToPage('friends')}
          className="px-6 py-3 bg-[#441752] text-white rounded-lg shadow-md hover:bg-[#8174A0] transition duration-300"
        >
          Friends List
        </button>
        <button
          onClick={() => navigateToPage('Search-Friend')}
          className="px-6 py-3 bg-[#441752] text-white rounded-lg shadow-md hover:bg-[#8174A0] transition duration-300"
        >
          Search Friend
        </button>
      </div>

      {/* Render the current page component */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        {currentPage === 'all-users' && <AllUsersPage />}
        {currentPage === 'friend-recommendations' && <FriendRecommendationsPage />}
        {currentPage === 'friend-requests' && <FriendRequestsPage />}
        {currentPage === 'friends' && <FriendsPage />}
        {currentPage === 'Search-Friend' && <SearchUsersPage />}
      </div>
    </div>
  );
};

export default HomePage;
