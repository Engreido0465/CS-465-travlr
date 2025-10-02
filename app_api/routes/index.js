// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const trips = require('../controllers/trips');

router.get('/health', (req, res) => res.json({ ok: true }));
router.get('/trips', trips.list);
router.get('/trips/:tripId', trips.readOne);

module.exports = router;
