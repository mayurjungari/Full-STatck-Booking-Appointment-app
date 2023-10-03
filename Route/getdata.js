const express = require('express');
const router = express.Router();
const path = require('path');
const { Appointment } = require('../models/book'); // Make sure to use destructuring here

router.get('/book/getdata', async (req, res) => {
  try {
    const data = await Appointment.findAll(); // Correct the function name here
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
