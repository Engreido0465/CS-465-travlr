// app_server/models/trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    image: {
      type: String,
      trim: true // e.g., "reef1.jpg"
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    description2: {
      type: String,
      trim: true,
      maxlength: 500
    },
    length: {
      type: Number,
      required: true,
      min: 1,
      // Adjust if you expect longer trips
      max: 60
    },
    // Keep as String to match your seed data ("Oct 12", "Nov 1", "Dec 3")
    start: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    collection: 'trips', // explicit collection name
    timestamps: true     // adds createdAt / updatedAt
  }
);

module.exports = mongoose.model('Trip', tripSchema);
