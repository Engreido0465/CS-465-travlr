'use strict';

/**
 * Load env first so every require can use process.env
 */
require('dotenv').config();

const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const apiRouter = require('./app_server/routes/api');

// ---- routes ----
const indexRouter   = require('./routes/index');                 // default index route
const travelRouter  = require('./app_server/routes/travel');     // server-side HBS routes
// const usersRouter = require('./routes/users');                 // only if you actually have this

// ---- database init (must happen very early) ----
const { connect } = require('./app_server/db');

(async () => {
  try {
    await connect();
  } catch (err) {
    console.error('Mongo init failed:', err);
    process.exit(1);
  }
})();

const app = express();

// ---- view engine setup ----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register partials if you use them (safe if the folder exists or not)
hbs.registerPartials(
  path.join(__dirname, 'app_server', 'views', 'partials')
);

// ---- middleware ----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ---- mount routes ----
app.use('/', indexRouter);
app.use('/travel', travelRouter);
// app.use('/users', usersRouter); // enable only if it exists
app.use('/api', apiRouter);

// ---- 404 ----
app.use((req, res, next) => {
  next(createError(404));
});

// ---- error handler ----
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ---- graceful shutdown (SIGINT / SIGTERM) ----
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
