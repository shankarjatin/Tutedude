import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styles for toast notifications

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, { username, password, interests });
      toast.success('User registered successfully!'); // Show success toast
      setTimeout(() => {
        navigate('/login'); // Redirect to login after success
      }, 2000);
    } catch (err) {
      toast.error('Registration failed! Please try again.'); // Show error toast
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#A888B5] to-[#441752]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-[#441752] mb-6">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#441752]" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
              placeholder="Enter your username"
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

          {/* Interests Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#441752]" htmlFor="interests">
              Interests
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-[#F3E5F5] text-[#441752] px-3 py-1 rounded-full flex items-center"
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
                className="w-full sm:w-auto p-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
                placeholder="Add an interest"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="ml-2 p-3 bg-[#441752] text-white rounded-full hover:bg-[#8174A0]"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#441752] text-white font-semibold rounded-lg shadow-md hover:bg-[#8174A0] focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
          >
            Register
          </button>

          {/* Already have an account? Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-[#441752]">
              Already have an account?{' '}
              <a href="/login" className="text-[#A888B5] hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>

      {/* Toast container to render toasts */}
      <ToastContainer />

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full py-4 text-center text-sm text-[#441752] bg-white">
        <p>Full Stack Intern Role Assignment Submission by Jatin Shankar Srivastava</p>
      </div>
    </div>
  );
};

export default RegisterPage;
