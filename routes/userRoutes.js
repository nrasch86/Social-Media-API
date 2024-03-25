const router = require('express').Router();
const UserController = require('../controllers/userController');

// Routes for searching users & creating new user
router.route('/')
  .get(UserController.getAllUsers)  // GET all users
  .post(UserController.createUser); // POST a new user

// Routes for single user search & user update
router.route('/:id')
  .get(UserController.getUserById)      // GET a single user by id
  .put(UserController.updateUserById)   // UPDATE a user by id
  .delete(UserController.deleteUserById); // DELETE a user by id

// Routes for managing a user's friends list
router.route('/:userId/friends/:friendId')
  .post(UserController.addFriend)       // ADD a friend to the user's friend list
  .delete(UserController.removeFriend); // REMOVE a friend from the user's friend list

module.exports = router;
