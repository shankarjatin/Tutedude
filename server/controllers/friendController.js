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
  