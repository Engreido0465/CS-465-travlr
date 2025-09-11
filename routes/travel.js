var express = require('express');
var router  = require('express').Router();

router.get('/', function(req, res) {
  res.render('travel', { title: 'Travlr Getaways' });
});

module.exports = router;
