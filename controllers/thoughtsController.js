const { Thought, User } = require('../models');

const ThoughtsController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(500).json(err));
  },

  // Get a single thought by ID
  getThoughtById(req, res) {
    Thought.findById(req.params.id)
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought exists with this ID' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },
  
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thoughtData => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'Thought created, but no user exists with this ID' });
          return;
        }
        res.json({ message: 'Thought has been created!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought exists with this ID' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  // Delete a thought
  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought exists with this ID' });
          return;
        }
        res.json({ message: 'Thought has been deleted!' });
      })
      .catch(err => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought exists with this ID' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No reaction exists with this ID' });
        return;
      }
      res.json({ message: 'Reaction successfully removed', thoughtData });
    })
    .catch(err => res.status(500).json(err));
  },
};

module.exports = ThoughtsController;
