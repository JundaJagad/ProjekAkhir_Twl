const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const loggedInUsers = [];

// Register a new user
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// User login
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ user: user.username }, 'junda', { expiresIn: '1h' });

    // Add the logged-in user to the loggedInUsers array
    loggedInUsers.push(username);

    // Set the JWT token as a cookie
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true }); // Expiry set to 1 hour (3600000 milliseconds)

    // Return the token as a response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// User logout
async function logout(req, res) {
  try {
    const { username } = req.body;

    // Remove the logged-out user from the loggedInUsers array
    const index = loggedInUsers.indexOf(username);
    if (index !== -1) {
      loggedInUsers.splice(index, 1);
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get logged-in users
function getLoggedInUsers(req, res) {
  res.json(loggedInUsers);
}

module.exports = {
  registerUser,
  getUsers,
  login,
  logout,
  getLoggedInUsers,
};
