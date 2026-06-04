const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const computerRoutes = require('./routes/computerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Computer Inventory API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/computers', computerRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

module.exports = app;