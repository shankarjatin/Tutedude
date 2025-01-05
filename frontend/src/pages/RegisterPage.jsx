import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Popup from '../components/Popup';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, { username, password, interests });
      setShowPopup(true); // Show the popup after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/login'); // Redirect to login after popup close
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Interests Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="interests">
              Interests
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                className="w-full sm:w-auto p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add an interest"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>

          {/* Already have an account? Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">Login</a>
            </p>
          </div>
        </form>

        {/* Popup after successful registration */}
        {showPopup && <Popup message="User registered successfully!" onClose={handleClosePopup} />}
      </div>
    </div>
  );
};

export default RegisterPage;
