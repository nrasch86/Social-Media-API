const router = require('express').Router();
const ThoughtsController = require('../controllers/thoughtsController');

// Routes for searching all thoughts and creating new thought
router.route('/')
  .get(ThoughtsController.getAllThoughts) // GET all thoughts
  .post(ThoughtsController.createThought); // POST a new thought

// Routes for single thought search/update/deletion
router.route('/:id')
  .get(ThoughtsController.getThoughtById)      // GET a single thought by id
  .put(ThoughtsController.updateThoughtById)   // UPDATE a thought by id
  .delete(ThoughtsController.deleteThoughtById); // DELETE a thought by id

// Routes for managing reactions to thoughts
router.route('/:thoughtId/reactions')
  .post(ThoughtsController.addReaction) // ADD a reaction to a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(ThoughtsController.removeReaction); // REMOVE a reaction from a thought

module.exports = router;
