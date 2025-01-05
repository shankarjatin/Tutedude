import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import UserCard from '../components/UserCard';  // Import UserCard component
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for toast notifications

const FriendRequestsPage = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch friend requests
      axios
        .get(`${BASE_URL}/api/friends/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFriendRequests(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch friend requests:', err);
        });
    }
  }, [navigate]);

  const handleAcceptRequest = (requestId) => {
    const token = localStorage.getItem('token');
    axios
      .post(`${BASE_URL}/api/friends/requests/${requestId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success('Friend request accepted'); // Show success toast
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        ); // Remove accepted request instantly
      })
      .catch((err) => {
        console.error('Failed to accept friend request:', err);
        toast.error('Error accepting friend request'); // Show error toast
      });
  };

  const handleRejectRequest = (requestId) => {
    const token = localStorage.getItem('token');
    axios
      .post(`${BASE_URL}/api/friends/requests/${requestId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success('Friend request rejected'); // Show success toast
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        ); // Remove rejected request instantly
      })
      .catch((err) => {
        console.error('Failed to reject friend request:', err);
        toast.error('Error rejecting friend request'); // Show error toast
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-[#F9F6E6] min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-[#441752] mb-6">
        Friend Requests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {friendRequests.map((request) => (
          <UserCard
            key={request._id}
            username={request.username}
            interests={request.interests}
            mutualFriends={request.mutualFriends || 0}
            onSendRequest={() => {}}
            onAcceptRequest={() => handleAcceptRequest(request._id)}
            onRejectRequest={() => handleRejectRequest(request._id)}
            acceptButtonText="Accept"
            rejectButtonText="Reject"
          />
        ))}
      </div>
      {/* Toast container to render toasts */}
      <ToastContainer />
    </div>
  );
};

export default FriendRequestsPage;
