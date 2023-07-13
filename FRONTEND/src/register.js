import React, { useState, useEffect } from 'react';
import './register.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess(true);
        console.log('User registered successfully');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (success) {
      // Mengalihkan ke halaman login
      window.location.href = '/Login'; // Ganti dengan URL halaman login yang sesuai
    }
  }, [success]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!success && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
