'use strict';

// note to self: only one express import + one router in this file
const express = require('express');
const router  = express.Router();

// note to self: all handlers live in app_server/controllers/travel.js
const ctrl = require('../controllers/travel');

/* ===== travel section (HBS pages) =====
   note to self: mounted at /travel in app.js,
   so '/' here becomes '/travel', '/rooms' -> '/travel/rooms', etc.
*/

router.get('/',        ctrl.travel);   // landing page for travel section
router.get('/rooms',   ctrl.rooms);
router.get('/meals',   ctrl.meals);
router.get('/news',    ctrl.news);
router.get('/about',   ctrl.about);
router.get('/contact', ctrl.contact);

// note to self: export exactly once
module.exports = router;
