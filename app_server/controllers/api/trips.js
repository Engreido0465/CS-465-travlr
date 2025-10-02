// app_server/controllers/api/trips.js
const mongoose = require('mongoose');
const Trip = require('../../models/trip');

// GET /api/trips  -> list all trips (sorted by start date)
exports.list = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ start: 1 }).lean();
    res.status(200).json(trips);
  } catch (err) {
    console.error('Trips list error:', err.message);
    res.status(500).json({ message: 'Server error fetching trips' });
  }
};

// GET /api/trips/:id  -> get one trip by _id
exports.readOne = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid trip id' });
  }

  try {
    const trip = await Trip.findById(id).lean();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    console.error('Trip read error:', err.message);
    res.status(500).json({ message: 'Server error fetching trip' });
  }
};
