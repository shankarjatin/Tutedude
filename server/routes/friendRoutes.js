const express = require('express');
const {
    getAllUsers,
  searchUsers,
  getFriends,
  removeFriend,
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getRecommendations,
} = require('../controllers/friendController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/all', authenticate, getAllUsers);
// Search for users
router.get('/search', authenticate, searchUsers);

// Get user's friends
router.get('/', authenticate, getFriends);

// Remove a friend
router.delete('/:id', authenticate, removeFriend);

// Get friend requests
router.get('/requests', authenticate, getFriendRequests);

// Send a friend request
router.post('/requests/:userId', authenticate, sendFriendRequest);

// Accept a friend request
router.post('/requests/:requestId/accept', authenticate, acceptFriendRequest);

// Reject a friend request
router.post('/requests/:requestId/reject', authenticate, rejectFriendRequest);

// Get friend recommendations
router.get('/recommendations', authenticate, getRecommendations);

module.exports = router;
