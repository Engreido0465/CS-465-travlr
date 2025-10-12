'use strict';

// note to self: single express import + router instance
const express = require('express');
const router  = express.Router();

// note to self: there is no controllers/traveler.js — use the existing travel controller
const ctrl = require('../controllers/travel');

/* ===== top-level site pages (mounted at '/') =====
   note to self: if I later split controllers by page, just change this require
*/

// Home
router.get('/', ctrl.travel);

// Other simple pages
router.get('/rooms',   ctrl.rooms);
router.get('/meals',   ctrl.meals);
router.get('/news',    ctrl.news);
router.get('/about',   ctrl.about);
router.get('/contact', ctrl.contact);

// note to self: export exactly once
module.exports = router;
