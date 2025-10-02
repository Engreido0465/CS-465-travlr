// app_api/routes/api.js
const express = require('express');
const router = express.Router();

const trips = require('../controllers/trips');

router.get('/health', (req, res) => res.json({ ok: true }));
router.get('/trips', trips.list);             // <-- pass function, don't call it
router.get('/trips/:tripId', trips.readOne);

module.exports = router;
