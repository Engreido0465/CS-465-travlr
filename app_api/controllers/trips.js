// app_api/controllers/trips.js
const mongoose = require('mongoose');
const Trip = require('../models/trip');

const list = async (req, res) => {
  try {
    const trips = await Trip.find({}).select('-__v').lean().exec();
    res.json({ trips });
  } catch (err) {
    console.error('Trips list error:', err.message);
    res.status(500).json({ message: 'Server error listing trips' });
  }
};

const readOne = async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!tripId || !mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid trip id' });
    }

    const trip = await Trip.findById(tripId).select('-__v').lean().exec();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    res.json({ trip });
  } catch (err) {
    console.error('Trips readOne error:', err.message);
    res.status(500).json({ message: 'Server error loading trip' });
  }
};

module.exports = { list, readOne };
