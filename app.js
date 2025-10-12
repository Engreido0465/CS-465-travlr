'use strict';

/* Keep env vars loaded first so anything below can read MONGO_URI, etc. */
require('dotenv').config();

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const hbs           = require('hbs');
const mongoose      = require('mongoose');

/* ===== Site (HBS) routes (live in app_server) ===== */
const indexRouter   = require('./app_server/routes/index');   // '/' pages
const travelRouter  = require('./app_server/routes/travel');  // '/travel' pages

/* ===== API routes (moved to app_api) ===== */
const apiRouter     = require('./app_api/routes/index');

/* ===== Connect to Mongo (via app_api/db) ===== */
const { connect }   = require('./app_api/db');

(async () => {
  try {
    await connect();
  } catch (err) {
    console.error('Mongo init failed:', err);
    process.exit(1);
  }
})();

const app = express();

/* ===== View engine (HBS) ===== */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

/* ===== Middleware ===== */
/* Note: JSON body parsing MUST come before mounting /api so POST/PUT bodies are available */
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());                         // <-- important for /api POST/PUT
app.use(express.urlencoded({ extended: false })); // form posts (site)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ===== Mount routes ===== */
app.use('/', indexRouter);
app.use('/travel', travelRouter);

/* Note: API lives under /api and returns JSON (see error handler below) */
app.use('/api', apiRouter);

/* ===== 404 handler ===== */
app.use((req, res, next) => next(createError(404)));

/* ===== Error handlers ===== */
/* API errors -> JSON; site errors -> HBS */
app.use((err, req, res, next) => {
  const status = err.status || 500;

  // If the request was for /api, return JSON error (no HBS page)
  if (req.path.startsWith('/api')) {
    const payload = { message: err.message || 'Server error' };
    if (req.app.get('env') === 'development') {
      payload.stack = err.stack;
      if (err.errors) payload.errors = err.errors;
    }
    return res.status(status).json(payload);
  }

  // HBS error page for site routes
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  res.render('error');
});

/* ===== Graceful shutdown ===== */
/* Close Mongo cleanly on SIGINT/SIGTERM so node exits quickly */
const shutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`MongoDB disconnected on ${signal}`);
  } catch (e) {
    console.error('Error while closing Mongo connection:', e);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = app;
