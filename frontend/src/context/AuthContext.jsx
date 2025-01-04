import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRecommendations, setFriendRecommendations] = useState([]);

  useEffect(() => {
    if (token) {
      // Fetch current user data and other information
      axios.get(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setUser(response.data))
        .catch(error => console.error(error));

      // Fetch friends and friend requests
      axios.get(`${BASE_URL}/api/friends`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setFriends(response.data))
        .catch(error => console.error(error));

      axios.get(`${BASE_URL}/api/friends/requests`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setFriendRequests(response.data))
        .catch(error => console.error(error));

      // Fetch friend recommendations
      axios.get(`${BASE_URL}/api/friends/recommendations`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setFriendRecommendations(response.data))
        .catch(error => console.error(error));
    }
  }, [token]);

  const login = (username, password) => {
    return axios.post(`${BASE_URL}/api/auth/login`, { username, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token in localStorage
        setToken(token);
        setUser({ username });
      });
  };

  const register = (username, password, interests) => {
    return axios.post(`${BASE_URL}/api/auth/register`, { username, password, interests });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const sendFriendRequest = (userId) => {
    return axios.post(`${BASE_URL}/api/friends/requests/${userId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const acceptFriendRequest = (requestId) => {
    return axios.post(`${BASE_URL}/api/friends/requests/${requestId}/accept`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const rejectFriendRequest = (requestId) => {
    return axios.post(`${BASE_URL}/api/friends/requests/${requestId}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const removeFriend = (friendId) => {
    return axios.delete(`${BASE_URL}/api/friends/${friendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const searchUsers = (query) => {
    return axios.get(`${BASE_URL}/api/users/search?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const value = {
    user,
    token,
    friends,
    friendRequests,
    friendRecommendations,
    login,
    register,
    logout,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    searchUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
