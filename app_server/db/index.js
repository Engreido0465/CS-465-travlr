'use strict';

const mongoose = require('mongoose');

// Optional: quiet some deprecation noise and keep behavior predictable
mongoose.set('strictQuery', true);

/**
 * Establish a MongoDB connection using MONGO_URI from the environment.
 * Throws on missing URI or on connection error.
 */
async function connect() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is missing. Check your .env file.');
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    // Re-throw so the caller can decide how to handle (exit, retry, etc.)
    throw new Error(`MongoDB connection error: ${err.message}`);
  }
}

module.exports = { connect };
