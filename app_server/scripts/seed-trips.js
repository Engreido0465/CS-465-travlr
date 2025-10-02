// app_server/scripts/seed-trips.js
require('dotenv').config();

const path = require('path');
const fs = require('fs');

const { connect } = require('../db');           // uses app_server/db/index.js
const Trip = require('../models/trip');         // uses the Trip model I just created
const mongoose = require('mongoose');

(async () => {
  try {
    await connect();

    // Read JSON from /data/trips.json (two levels up from scripts/)
    const file = path.join(__dirname, '../../data/trips.json');
    const raw = fs.readFileSync(file, 'utf8');

    const parsed = JSON.parse(raw);
    const source = Array.isArray(parsed.trips) ? parsed.trips : parsed;

    // Normalize values to match the schema types (dates, numbers, etc.)
    const docs = source.map(t => ({
      name: t.name,
      description: t.description,
      description2: t.description2,
      length: Number(t.length),
      start: t.start ? new Date(t.start) : new Date(),
      price: Number(
        typeof t.price === 'string' ? t.price.replace(/[^0-9.]/g, '') : t.price
      ),
      image: t.image
    }));

    // Replace all existing trips (dev-friendly and idempotent)
    await Trip.deleteMany({});
    const result = await Trip.insertMany(docs);

    console.log(`✅ Seed complete: inserted ${result.length} trips.`);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();
