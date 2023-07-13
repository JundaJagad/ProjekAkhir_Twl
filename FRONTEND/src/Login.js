import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = ({ onColorChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });
      const { token } = response.data;

      // Store the token in localStorage or session storage
      localStorage.setItem('token', token);

      // Set the modal title and body for success
      setModalTitle('Login Successful');
      setModalBody('You have successfully logged in.');

      // Show the modal
      setShowModal(true);

      // Perform additional actions, such as redirecting the user
      navigate('/dashboard');
    } catch (error) {
      // Set the modal title and body for error
      setModalTitle('Login Error');
      setModalBody('Invalid username or password.');

      // Show the modal
      setShowModal(true);

      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2 className="login-heading">Login</h2>
      <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-container">
          <Button className="login-button" type="submit" variant="success">
            Login
          </Button>
          <Button className="register-button" onClick={handleRegister} variant="primary">
            Register
          </Button>
        </div>
      </Form>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginForm;
