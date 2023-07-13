const express = require('express');
const userController = require('./controller/usercontroller');

const router = express.Router();

// Register a new user
router.post('/register', userController.registerUser);

// Get all users
router.get('/users', userController.getUsers);

// User login
router.post('/login', userController.login);

// User logout
router.post('/logout', userController.logout);

// Get logged-in users
router.get('/loggedinusers', userController.getLoggedInUsers);

module.exports = router;
