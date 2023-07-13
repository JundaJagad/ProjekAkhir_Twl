const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  nik: { type: String, required: true },
  alamat: { type: String, required: true },
  nomerTelepon: { type: String, required: true }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
