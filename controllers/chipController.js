const Chip = require('../models/chipModel');

exports.checkChip = async (req, res) => {
  const chipId = req.params.chipId;
  try {
    const chip = await Chip.findOne({ chipId });
    if (!chip) {
      return res.status(404).json({ error: 'Chip not found' });
    }
    if (chip.owner && chip.contactInfo) {
      res.json({ registered: true, chip });
    } else {
      res.json({ registered: false, chip });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.registerChip = async (req, res) => {
  const { chipId, owner, contactInfo, petName, petBreed, petAge } = req.body;
  try {
    const chip = await Chip.findOneAndUpdate(
      { chipId },
      { owner, contactInfo, petName, petBreed, petAge, route: `/details/${chipId}` },
      { new: true, upsert: true }
    );
    res.status(201).json({ message: 'Registro exitoso', route: chip.route });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
