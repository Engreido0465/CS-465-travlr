// app_api/db/index.js
const mongoose = require('mongoose');

let listenersRegistered = false;

function registerConnectionListeners() {
  if (listenersRegistered) return;
  const conn = mongoose.connection;

  conn.on('connected', () => {
    console.log(`MongoDB connected${conn.name ? `: ${conn.name}` : ''}`);
  });

  conn.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });

  conn.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });

  listenersRegistered = true;
}

async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is missing. Check your .env file.');
    process.exit(1);
  }

  // Quiet legacy warnings / keep queries strict
  mongoose.set('strictQuery', true);

  registerConnectionListeners();

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;
  if (state === 1 || state === 2) return;

  try {
    await mongoose.connect(uri, {
      // kept for compatibility across Mongoose versions
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10_000,
    });
  } catch (err) {
    console.error('MongoDB initial connection error:', err.message);
    process.exit(1);
  }
}

async function disconnect() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err.message);
  }
}

module.exports = { connect, disconnect };
