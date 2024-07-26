const express = require('express');
const router = express.Router();
const chipController = require('../controllers/chipController');
const Chip = require('../models/chipModel');

router.get('/check/:chipId', chipController.checkChip);
router.post('/register', chipController.registerChip);

router.get('/:chipId', async (req, res) => {
  const chipId = req.params.chipId;
  try {
    const chip = await Chip.findOne({ chipId });
    if (!chip) {
      return res.status(404).send('Chip not found');
    }
    if (chip.owner && chip.contactInfo) {
      res.render('dynamicPage', { chipId: chip.chipId, owner: chip.owner, contactInfo: chip.contactInfo, petName: chip.petName, petBreed: chip.petBreed, petAge: chip.petAge });
    } else {
      res.redirect(`/register.html?chipId=${chipId}`);
    }
  } catch (err) {
    console.error('Error al buscar el chip:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
