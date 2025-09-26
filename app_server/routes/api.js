// app_server/routes/api.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

// quick sanity endpoint
router.get('/health', (req, res) => {
  res.json({ ok: true });
});

// list all trips (for now, public)
router.get('/trips', async (req, res, next) => {
  try {
    const trips = await Trip.find().lean().exec();
    res.json({ trips });
  } catch (err) {
    next(err);
  }
});

// get one trip by id (optional but handy for testing)
router.get('/trips/:id', async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id).lean().exec();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
