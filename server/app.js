const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const friendRoutes = require('./routes/friendRoutes');
require('dotenv').config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/friends', friendRoutes);

module.exports = app;
