var express = require('express');
var router  = express.Router();

const express = require('express');
const router = express.Router();
const traveler = require('../controllers/traveler');

router.get('/', traveler.travel);

module.exports = router;
