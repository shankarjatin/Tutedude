import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import UserCard from '../components/UserCard';  // Import UserCard component

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      // Fetch friends list
      axios
        .get(`${BASE_URL}/api/friends`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFriends(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch friends:', err);
        });
    }
  }, [navigate]);

  const handleRemoveFriend = (friendId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`${BASE_URL}/api/friends/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('Friend removed successfully');
        // Immediately update state to remove the friend from the list
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend._id !== friendId)
        );
      })
      .catch((err) => {
        console.error('Failed to remove friend:', err);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-[#F9F6E6] min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-[#441752] mb-6">
        Your Friends
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {friends.map((friend) => (
          <UserCard
            key={friend._id}
            username={friend.username}
            interests={friend.interests}
            mutualFriends={friend.mutualFriends || 0}
            onRemoveFriend={() => handleRemoveFriend(friend._id)}  // Handle Remove Friend
          />
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
