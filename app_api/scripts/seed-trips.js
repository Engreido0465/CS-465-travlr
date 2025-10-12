// app_api/scripts/seed-trips.js
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const Trip = require('../models/trip');

(async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
    console.log('[seed] Connecting to mongodb:', uri);

    // Connect
    await mongoose.connect(uri);

    // Load JSON from /data/trips.json (two levels up from /scripts)
    const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
    // require works fine for JSON here; you can also fs.readFile if you prefer
    const trips = require(dataPath);

    if (!Array.isArray(trips) || trips.length === 0) {
      throw new Error(`No trips found in ${dataPath}`);
    }

    // Reset + seed
    await Trip.deleteMany({});
    const inserted = await Trip.insertMany(trips);

    console.log(`[seed] Inserted ${inserted.length} trips`);
  } catch (err) {
    console.error('[seed] FAILED:', err);
    process.exitCode = 1;
  } finally {
    // Modern Mongoose: close() returns a promise; no callback allowed
    await mongoose.connection.close();
  }
})();
