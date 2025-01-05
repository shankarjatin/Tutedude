import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import UserCard from '../components/UserCard';  // Import the UserCard component
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for toast notifications

const FriendRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch friend recommendations
      axios
        .get(`${BASE_URL}/api/friends/recommendations`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setRecommendations(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch recommendations:', err);
        });
    }
  }, [navigate]);

  const handleSendRequest = (userId) => {
    const token = localStorage.getItem('token');
    axios
      .post(`${BASE_URL}/api/friends/requests/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRecommendations((prevRecommendations) =>
          prevRecommendations.map((user) =>
            user._id === userId ? { ...user, requestSent: true } : user
          )
        );
        toast.success('Friend request sent successfully!'); // Show success toast
      })
      .catch((err) => {
        console.error('Failed to send friend request:', err);
        toast.error('Error sending friend request!'); // Show error toast
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-[#F9F6E6] min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-[#441752] mb-6">
        Friend Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((user) => (
          <UserCard
            key={user._id}
            username={user.username}
            interests={user.interests}
            mutualFriends={user.mutualFriends || 0}
            onSendRequest={() => handleSendRequest(user._id)}
            requestSent={user.requestSent || false}  // Track if the request is sent
          />
        ))}
      </div>

      {/* Toast container to render toasts */}
      <ToastContainer/>
    </div>
  );
};

export default FriendRecommendationsPage;
