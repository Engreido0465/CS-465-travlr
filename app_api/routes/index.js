// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const trips = require('../controllers/trips');

router.get('/health', (req, res) => res.json({ ok: true }));

router.get('/trips', trips.list);
router.get('/trips/:tripId', trips.readOne);
router.post('/trips', trips.create);
router.put('/trips/:tripId', trips.update);
router.delete('/trips/:tripId', trips.remove);

module.exports = router;
