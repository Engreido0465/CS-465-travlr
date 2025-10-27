require('dotenv').config(); // Load environment variables from .env

// ------------------------------------------------------
// Load dependencies
// ------------------------------------------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var cors = require('cors');

// ------------------------------------------------------
// Wire in our authentication module
// ------------------------------------------------------
var passport = require('passport');
require('./app_api/config/passport');

// ------------------------------------------------------
// Bring in the database connection
// ------------------------------------------------------
require('./app_api/models/db');

// ------------------------------------------------------
// Create Express app instance
// ------------------------------------------------------
var app = express();

// ------------------------------------------------------
// Middleware setup
// ------------------------------------------------------
app.use(cors()); // Allow frontend (Angular) to access API
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); // Initialize Passport

// ------------------------------------------------------
// Enable CORS manually for /api endpoint
// ------------------------------------------------------
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// ------------------------------------------------------
// Set up routes
// ------------------------------------------------------
var apiRouter = require('./app_api/routes/index');
app.use('/api', apiRouter);

// ------------------------------------------------------
// Handle 404 errors
// ------------------------------------------------------
app.use(function (req, res, next) {
  next(createError(404));
});

// ------------------------------------------------------
// Catch unauthorized error and create 401
// ------------------------------------------------------
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: err.name + ': ' + err.message });
  }
});

// ------------------------------------------------------
// Global error handler
// ------------------------------------------------------
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Return JSON for API errors
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// ------------------------------------------------------
// Export app
// ------------------------------------------------------
module.exports = app;
