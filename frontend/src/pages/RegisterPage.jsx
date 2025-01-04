// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Popup from '../components/Popup';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interestsArray = interests.split(',').map(interest => interest.trim());

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, { username, password, interests: interestsArray });
      setShowPopup(true); // Show the popup after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/login'); // Redirect to login after popup close
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="block w-full p-2 mb-4 border border-gray-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block w-full p-2 mb-4 border border-gray-300"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          className="block w-full p-2 mb-4 border border-gray-300"
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-green-500 text-white">Register</button>
      </form>

      {showPopup && <Popup message="User registered successfully!" onClose={handleClosePopup} />}
    </div>
  );
};

export default RegisterPage;
