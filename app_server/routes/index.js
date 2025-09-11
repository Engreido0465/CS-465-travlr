var express = require('express');
var router  = express.Router();

const express = require('express');
const router = express.Router();
const traveler = require('../controllers/traveler');

// Home
router.get('/', traveler.home);

// Other simple pages (point these to controllers added below or use their own files)
router.get('/rooms', traveler.rooms);
router.get('/meals', traveler.meals);
router.get('/news', traveler.news);
router.get('/about', traveler.about);
router.get('/contact', traveler.contact);

module.exports = router;
