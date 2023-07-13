// dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import AddPersonForm from './AddPersonForm';
import EditPersonForm from './editPersonForm';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const headers = {
        Authorization: `Bearer ${token}` // Add the token to the 'Authorization' header
      };
      console.log(token)
  
      const response = await axios.get('https://projek-akhir-twl-api.vercel.app/persons', { headers });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://projek-akhir-twl-api.vercel.app/persons/${id}`);
      console.log(`Delete entry with ID: ${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleAddPerson = async (newPersonData) => {
    try {
      await axios.post('https://projek-akhir-twl-api.vercel.app/persons', newPersonData);
      console.log('Person added:', newPersonData);
      fetchData();
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleUpdate = async (id, updatedPersonData) => {
   try {
      await axios.put(`https://projek-akhir-twl-api.vercel.app/persons/${id}`, updatedPersonData);
      console.log(`Person with ID ${id} updated:`, updatedPersonData);
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div>
      <h1>Data Penduduk</h1>
      {/* <AddPersonForm handleAddPerson={handleAddPerson} /> */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIK</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <React.Fragment key={entry._id}>
              {editId === entry._id ? (
                <EditPersonForm
                  id={entry._id}
                  nama={entry.nama}
                  nik={entry.nik}
                  alamat={entry.alamat}
                  nomerTelepon={entry.nomerTelepon}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <tr>
                  <td>{entry.nama}</td>
                  <td>{entry.nik}</td>
                  <td>{entry.alamat}</td>
                  <td>{entry.nomerTelepon}</td>
                  <td>
                    <button onClick={() => handleEdit(entry._id)}>Edit</button>
                  </td>
                  <td>
                    <button class="deletbtn" onClick={() => handleDelete(entry._id)}>Delete</button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className='button-container'>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
