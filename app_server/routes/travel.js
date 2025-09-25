const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/travel');

router.get('/',            ctrl.travel);
router.get('/rooms',       ctrl.rooms);
router.get('/meals',       ctrl.meals);
router.get('/news',        ctrl.news);
router.get('/about',       ctrl.about);
router.get('/contact',     ctrl.contact);

module.exports = router;