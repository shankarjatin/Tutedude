// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AllUsersPage from './pages/AllUsersPage';
import FriendRecommendationsPage from './pages/FriendRecommendationsPage';
import FriendRequestsPage from './pages/FriendRequestsPage';
import FriendsPage from './pages/FriendsPage';
import SearchUsersPage from './pages/SearchUsersPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="/friend-recommendations" element={<FriendRecommendationsPage />} />
        <Route path="/friend-requests" element={<FriendRequestsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/search" element={<SearchUsersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
