const { User } = require('../models');

const UserController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // Get one user by ID
  getUserById(req, res) {
    User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends')
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No users exist with this ID' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },
  
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // Update a user by ID
  updateUserById(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No users exist with this ID' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // Delete a user
  deleteUserById(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No users exist with this ID' });
          return;
        }
        res.json({ message: 'User has been deleted!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // Add a friend to the user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No users exist with this ID' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(500).json(err));
  },

  // Remove a friend from the user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No users exist with this ID' });
        return;
      }
      res.json({ message: 'Friend has been removed!', userData });
    })
    .catch(err => res.status(500).json(err));
  },
};

module.exports = UserController;
