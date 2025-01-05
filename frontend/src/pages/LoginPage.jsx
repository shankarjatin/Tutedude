import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styles for toast notifications

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
      toast.success('Login successful!'); // Show success toast
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Invalid username or password'); // Show error toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#A888B5] to-[#441752]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-[#441752] mb-6">Welcome back</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Address Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#441752]" htmlFor="email">
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#441752]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
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
              className="w-4 h-4 text-[#441752] border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-[#441752]">Remember for 30 days</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#441752] text-white font-semibold rounded-lg shadow-md hover:bg-[#8174A0] focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-[#441752]">
              Don't have an account?{' '}
              <a href="/" className="text-[#A888B5] hover:underline">Sign up</a>
            </p>
          </div>
        </form>
      </div>

      {/* Toast container to render toasts */}
      <ToastContainer />
      <div className="absolute bottom-0 left-0 w-full py-4 text-center text-sm text-[#441752] bg-white">
        <p>Full Stack Intern Role Assignment Submission by Jatin Shankar Srivastava</p>
      </div>
    </div>
  );
};

export default LoginPage;
