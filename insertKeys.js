const mongoose = require('mongoose');
require('dotenv').config();

const chipSchema = new mongoose.Schema({
  chipId: { type: String, required: true, unique: true },
  owner: { type: String, default: '' },
  contactInfo: { type: String, default: '' },
  route: { type: String, required: true }
});

const Chip = mongoose.model('Chip', chipSchema);

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    insertKeys();
  })
  .catch(err => console.error('Error de conexión', err));

async function insertKeys() {
  const keys = [
    { chipId: 'ABCD-EFGH-IJ', route: '/details/ABCD-EFGH-IJ' },
    { chipId: 'JKLM-NOPQ-RS', route: '/details/JJKLM-NOPQ-RS' },
    { chipId: 'TUVW-XYZ1-23', route: '/details/TUVW-XYZ1-23' },
    { chipId: '4567-890A-BC', route: '/details/4567-890A-BC' },
    { chipId: 'DEFG-HIJK-LM', route: '/details/DEFG-HIJK-LM' },
    { chipId: 'NOPQ-RSTU-VW', route: '/details/NOPQ-RSTU-VW' },
    { chipId: 'XYZ1-2345-67', route: '/details/XYZ1-2345-67' },
    { chipId: '890A-BCDE-FG', route: '/details/890A-BCDE-FG' },
    { chipId: 'HIJK-LMNO-PQ', route: '/details/HIJK-LMNO-PQ' },
    { chipId: 'RSTU-VWXY-Z1', route: '/details/RSTU-VWXY-Z1' },
    { chipId: '2345-6789-0A', route: '/details/2345-6789-0A' },
    { chipId: 'BCDE-FGHI-JK', route: '/details/BCDE-FGHI-JK' }
  ];

  try {
    await Chip.insertMany(keys);
    console.log('Claves insertadas exitosamente');
  } catch (err) {
    console.error('Error al insertar claves', err);
  } finally {
    mongoose.connection.close();
  }
}
