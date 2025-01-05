// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      const { token } = response.data;

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Redirect to home page after successful login
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome back</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Address Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
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

          {/* Remember me Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember for 30 days</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          {/* Forgot Password Link
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>

          {/* Google Sign-In */}
          {/* <div className="mt-6 text-center">
            <button
              className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none"
              onClick={() => {}}
            >
              <span className="mr-2">Sign in with Google</span>
              <img src="/google-icon.svg" alt="Google Icon" className="inline h-5" />
            </button>
          </div> */} 
          
          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
