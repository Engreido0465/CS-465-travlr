// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const trips = require('../controllers/trips');

// Small helper so unhandled async errors reach the error middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Health check (useful for uptime monitors / k8s probes)
router.get('/health', (req, res) => res.json({ ok: true }));

// Validate :tripId looks like a Mongo ObjectId (24 hex chars)
router.param('tripId', (req, res, next, tripId) => {
  if (!/^[0-9a-fA-F]{24}$/.test(tripId)) {
    return res.status(400).json({ message: 'Invalid tripId format' });
  }
  next();
});

// Trips CRUD
router.get('/trips', asyncHandler(trips.list));
router.get('/trips/:tripId', asyncHandler(trips.readOne));
router.post('/trips', asyncHandler(trips.create));
router.put('/trips/:tripId', asyncHandler(trips.update));
router.delete('/trips/:tripId', asyncHandler(trips.remove));

module.exports = router;
