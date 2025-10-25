var express = require('express');
var router = express.Router();
var controller = require('../controllers/rooms');

/* GET rooms page. */
router.get('/', controller.roomsPage);

module.exports = router;
