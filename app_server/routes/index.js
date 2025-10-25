var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');

// GET home page and delegate rendering to the controller
router.get("/trips", ctrlMain.index);

module.exports = router;
