import React, { useState } from 'react';
import axios from 'axios';

const AddPersonForm = () => {
  const [newPerson, setNewPerson] = useState({
    nama: '',
    nik: '',
    alamat: '',
    nomerTelepon: ''
  });

  const handleInputChange = (e) => {
    setNewPerson({
      ...newPerson,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPerson = async () => {
    try {
      await axios.post('https://projek-akhir-twl-api.vercel.app/persons', newPerson);
      console.log('Person added:', newPerson);
      setNewPerson({
        nama: '',
        nik: '',
        alamat: '',
        nomerTelepon: ''
      });
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  return (
    <div>
      <h1>Add Person</h1>
      <form>
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={newPerson.nama}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nik"
          placeholder="NIK"
          value={newPerson.nik}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="alamat"
          placeholder="Alamat"
          value={newPerson.alamat}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nomerTelepon"
          placeholder="Nomor Telepon"
          value={newPerson.nomerTelepon}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddPerson}>
          Add Person
        </button>
      </form>
    </div>
  );
};

export default AddPersonForm;
