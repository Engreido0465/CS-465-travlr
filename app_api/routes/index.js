const express = require('express');
const router = express.Router();

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');

// Custom JWT Authentication Middleware
function authenticateJWT(req, res, next) {
  // console.log("In Middleware");
  const authHeader = req.headers['authorization'];
  // console.log("Auth Header: " + authHeader);

  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');
  if (headers.length < 2) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(' ')[1];
  // console.log("Token: " + token);

  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  // console.log(process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log("Token Validation Error:", err.message);
      return res.status(401).json({ message: "Token Validation Error" });
    }
    req.auth = verified; // Set the auth param to the decoded token object
    next(); // Continue to next middleware/route
  });
}

// Authentication routes
router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

// Trip routes (protected endpoints)
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

// Export router
module.exports = router;
