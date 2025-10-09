// app_api/controllers/trips.js
const mongoose = require('mongoose');
const Trip = require('../models/trip');

// LIST (already done)
const list = async (req, res) => {
  try {
    const trips = await Trip.find().lean().exec();
    res.json({ trips });
  } catch (err) {
    console.error('Trips list error:', err.message);
    res.status(500).json({ message: 'Server error listing trips' });
  }
};

// READ ONE (already done)
const readOne = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid trip id' });
    }
    const trip = await Trip.findById(tripId).lean().exec();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ trip });
  } catch (err) {
    console.error('Trips readOne error:', err.message);
    res.status(500).json({ message: 'Server error loading trip' });
  }
};

// CREATE
const create = async (req, res) => {
  try {
    const { name, description, description2, length, start, price, image } = req.body;
    if (!name || !length || !start || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const doc = await Trip.create({
      name,
      description: description || '',
      description2: description2 || '',
      length: Number(length),
      start: new Date(start),
      price: Number(price),
      image: image || 'reef1.jpg'
    });
    res.status(201).json({ trip: doc });
  } catch (err) {
    console.error('Trips create error:', err.message);
    res.status(500).json({ message: 'Server error creating trip' });
  }
};

// UPDATE
const update = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid trip id' });
    }
    const patch = { ...req.body };
    if (patch.length) patch.length = Number(patch.length);
    if (patch.price) patch.price = Number(patch.price);
    if (patch.start) patch.start = new Date(patch.start);

    const doc = await Trip.findByIdAndUpdate(tripId, patch, { new: true }).lean().exec();
    if (!doc) return res.status(404).json({ message: 'Trip not found' });
    res.json({ trip: doc });
  } catch (err) {
    console.error('Trips update error:', err.message);
    res.status(500).json({ message: 'Server error updating trip' });
  }
};

// DELETE
const remove = async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid trip id' });
    }
    const doc = await Trip.findByIdAndDelete(tripId).lean().exec();
    if (!doc) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).end();
  } catch (err) {
    console.error('Trips delete error:', err.message);
    res.status(500).json({ message: 'Server error deleting trip' });
  }
};

module.exports = { list, readOne, create, update, remove };
