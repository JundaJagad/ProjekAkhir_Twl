const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const isAuthenticated = require('./middleware/authmiddleware')
const cors = require('cors')
// const userroute = require('./src/router/userrouter')

const personController = require('./controller/personController');
const userController = require('./controller/usercontroller');
// const Person = require('./src/models/personModel');
app.use(cors())
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });


// Connect to MongoDB Atlas
const connectionString = 'mongodb+srv://junda:MyLKs5iMSiccLObr@cluster0.8v1dorw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas', error);
  });

// Middleware for parsing JSON data
app.use(express.json());

// Routes
app.get('/persons',isAuthenticated, personController.getAllPersons);
app.post('/persons', personController.createPerson);
app.put('/persons/:id', personController.updatePerson);
app.delete('/persons/:id', personController.deletePersonById);

//user routes
// Register a new user
app.post('/register', userController.registerUser);

// Get all users
app.get('/users', userController.getUsers);

// User login
app.post('/login', userController.login);

// User logout
app.post('/logout', userController.logout);

// Get logged-in users
app.get('/loggedinusers', userController.getLoggedInUsers);


// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
