// app_api/models/trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true, maxlength: 60 },
    description: { type: String, trim: true, maxlength: 500 },
    description2:{ type: String, trim: true, maxlength: 500 },
    length:      { type: Number, required: true, min: 1, max: 30 },
    start:       { type: Date, required: true },
    price:       { type: Number, required: true, min: 0 },
    image:       { type: String, trim: true } // e.g., 'reef1.jpg'
  },
  {
    collection: 'trips',
    timestamps: true // adds createdAt / updatedAt
  }
);

module.exports = mongoose.model('Trip', tripSchema);
