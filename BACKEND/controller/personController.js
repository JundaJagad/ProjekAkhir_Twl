const Person = require('../models/personModel');

// Get all persons
const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new person
const createPerson = async (req, res) => {
  const person = new Person({
    nama: req.body.nama,
    nik: req.body.nik,
    alamat: req.body.alamat,
    nomerTelepon: req.body.nomerTelepon
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a person by ID
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    person.nama = req.body.nama;
    person.nik = req.body.nik;
    person.alamat = req.body.alamat;
    person.nomerTelepon = req.body.nomerTelepon;

    const updatedPerson = await person.save();
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a person by ID
const deletePersonById = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePersonById
};
