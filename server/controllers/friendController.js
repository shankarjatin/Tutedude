const User = require('../models/User');

// Search for users
exports.searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: req.user.id },
    }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};

// Get user's friends
exports.getFriends = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('friends', 'username');
      res.json(user.friends);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch friends' });
    }
  };
  
  exports.removeFriend = async (req, res) => {
    const friendId = req.params.id;
    try {
      await User.findByIdAndUpdate(req.user.id, { $pull: { friends: friendId } });
      await User.findByIdAndUpdate(friendId, { $pull: { friends: req.user.id } });
      res.json({ message: 'Friend removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove friend' });
    }
  };

  // Get friend requests
exports.getFriendRequests = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('friendRequests', 'username');
      res.json(user.friendRequests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch friend requests' });
    }
  };