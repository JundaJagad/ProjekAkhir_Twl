import React, { useState } from 'react';
import axios from 'axios';
import './form.css'; // Impor file CSS

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi data sebelum mengirimkan ke API
    if (!name || !email || !password) {
      setError('Harap lengkapi semua field');
      return;
    }

    // Kirim data ke API point menggunakan Axios
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { name, email, password });
      console.log('Response:', response.data);
      setSuccess('Data berhasil dikirim');
      setError('');
    } catch (error) {
      console.error('Error:', error.response.data);
      setError('Terjadi kesalahan saat mengirim data');
      setSuccess('');
    }

    // Reset nilai input setelah mengirimkan data
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Login</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <label className="form-label">
          Nama:
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form-label">
          Email:
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-label">
          Password:
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
