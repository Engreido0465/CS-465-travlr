'use strict';

/* note to self: keep env vars loaded first so anything below can read MONGO_URI, etc. */
require('dotenv').config();

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const mongoose      = require('mongoose');

/* ===== site (HBS) routes (live in app_server) ===== */
/* note to self: indexRouter serves '/', travelRouter serves '/travel' pages */
const indexRouter   = require('./app_server/routes/index');
const travelRouter  = require('./app_server/routes/travel');

/* ===== API routes (moved to app_api) ===== */
/* note to self: be explicit and load the *index.js* router so I don’t accidentally edit api.js */
const apiRouter     = require('./app_api/routes/index');

/* ===== connect to Mongo (via app_api/db) ===== */
/* note to self: centralize connect() logic there; this file just calls it. */
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

/* ===== view engine (HBS) ===== */
/* note to self: views are under app_server/views; partials live in ./partials */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express); // (VS Code sometimes whines if this isn’t explicit)
require('hbs').registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

/* ===== middleware ===== */
/* note to self: JSON body parsing MUST come before mounting /api so POST/PUT bodies are available */
app.use(logger('dev'));
app.use(express.json());                           // <-- important for /api POST/PUT
app.use(express.urlencoded({ extended: false }));  // form posts (site)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ===== mount routes ===== */
app.use('/', indexRouter);
app.use('/travel', travelRouter);

/* note to self: API lives under /api and returns JSON (see error handler below) */
app.use('/api', apiRouter);

/* ===== 404 handler ===== */
/* note to self: let later error middleware decide how to render (JSON vs HBS) */
app.use((req, res, next) => next(createError(404)));

/* ===== error handlers ===== */
/* api errors → JSON; site errors → HBS */
app.use((err, req, res, next) => {
  const status = err.status || 500;

  /* note to self: if the request was for /api, return JSON error (no HBS page) */
  if (req.path.startsWith('/api')) {
    /* expose only message; hide stack in production */
    const payload = { message: err.message || 'Server error' };
    if (req.app.get('env') === 'development' && err.errors) payload.errors = err.errors;
    return res.status(status).json(payload);
  }

  /* HBS error page for site routes */
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  res.render('error');
});

/* ===== graceful shutdown ===== */
/* note to self: close Mongo cleanly on SIGINT/SIGTERM so node exits quickly */
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
