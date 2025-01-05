const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const friendRoutes = require('./routes/friendRoutes');
const axios = require('axios');
require('dotenv').config();
const cron = require('node-cron');
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.get('/', (req, res) => {
    res.send('Server is running and active!');
    console.log('Server is running and active!');
  });
  
  // Schedule a cron job to run every 5 minutes to keep the server alive
  cron.schedule('**/2 * * * * *', async () => {
    try {
      console.log('Pinging server to keep it awake...');
      // Change this to your actual server's public URL
      await axios.get('https://tutedude-x2vx.onrender.com');
      console.log('Server pinged successfully');
    } catch (error) {
      console.error('Error pinging the server:', error.message);
    }
  });
  

module.exports = app;
