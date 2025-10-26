const express = require('express');
const router = express.Router();

// Import the trips controller
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)         // GET Method - list all trips
  .post(tripsController.tripsAddTrip);    // POST Method - add a new trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)   // GET trip by code
  .put(tripsController.tripsUpdateTrip);  // PUT (update) trip

module.exports = router;
