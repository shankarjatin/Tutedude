const User = require('../models/User');

// List all users in the system
exports.getAllUsers = async (req, res) => {
    try {
      // Find the current user and their friends
      const currentUser = await User.findById(req.user.id).populate('friends', '_id');
  
      // Get the IDs of the current user's friends
      const friendIds = currentUser.friends.map((friend) => friend._id.toString());
  
      // Fetch all users except the current user and their friends
      const users = await User.find({
        _id: { $nin: [req.user.id, ...friendIds] }, // Exclude current user and friends
      }).populate('friends', '_id'); // Populate friends for mutual friend calculation
  
      // Map users and calculate mutual friends
      const usersWithMutualFriends = users.map((user) => {
        const mutualFriends = user.friends.filter((friend) =>
          friendIds.includes(friend._id.toString())
        ).length;
  
        return {
          _id: user._id,
          username: user.username,
          interests: user.interests,
          mutualFriends,
        };
      });
  
      res.json(usersWithMutualFriends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  
  
  
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
  exports.sendFriendRequest = async (req, res) => {
    const userId = req.params.userId;
    try {
      await User.findByIdAndUpdate(userId, { $addToSet: { friendRequests: req.user.id } });
      res.json({ message: 'Friend request sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send friend request' });
    }
  };
  exports.acceptFriendRequest = async (req, res) => {
    const requestId = req.params.requestId;
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { friendRequests: requestId },
        $addToSet: { friends: requestId },
      });
      await User.findByIdAndUpdate(requestId, { $addToSet: { friends: req.user.id } });
      res.json({ message: 'Friend request accepted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept friend request' });
    }
  };
  
  exports.rejectFriendRequest = async (req, res) => {
    const requestId = req.params.requestId;
    try {
      await User.findByIdAndUpdate(req.user.id, { $pull: { friendRequests: requestId } });
      res.json({ message: 'Friend request rejected' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to reject friend request' });
    }
  };

  exports.getRecommendations = async (req, res) => {
    try {
      // Find the current user and their friends
      const user = await User.findById(req.user.id).populate('friends', '_id');
      const friendsIds = user.friends.map((f) => f._id.toString());
  
      // Find recommended users (mutual friends or common interests)
      const recommendations = await User.find({
        _id: { $nin: [req.user.id, ...friendsIds] }, // Exclude current user and their friends
        $or: [
          { friends: { $in: friendsIds } }, // Users with mutual friends
          { interests: { $in: user.interests } }, // Users with common interests
        ],
      }).populate('friends', '_id'); // Populate friends to calculate mutual friends
  
      // Map recommendations to include mutual friends count
      const recommendationsWithDetails = recommendations.map((recUser) => {
        const mutualFriends = recUser.friends.filter((friend) =>
          friendsIds.includes(friend._id.toString())
        ).length;
  
        return {
          _id: recUser._id,
          username: recUser.username,
          interests: recUser.interests,
          mutualFriends,
        };
      });
  
      res.json(recommendationsWithDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
  };
  
  