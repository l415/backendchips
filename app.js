const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();

// Configurar el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
