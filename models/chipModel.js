const mongoose = require('mongoose');

const chipSchema = new mongoose.Schema({
  chipId: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  contactInfo: { type: String, required: true },
  petName: { type: String, required: true },
  petBreed: { type: String, required: true },
  petAge: { type: Number, required: true },
  route: { type: String, required: true }
});

const Chip = mongoose.model('Chip', chipSchema);
module.exports = Chip;
