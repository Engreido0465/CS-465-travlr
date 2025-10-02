'use strict';

require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

// HBS site routes (stay in app_server)
const indexRouter = require('./routes/index');
const travelRouter = require('./app_server/routes/travel');

// API (moved to app_api)
const apiRouter = require('./app_api/routes/api');

// connect to Mongo (now from app_api/db)
const { connect } = require('./app_api/db');

(async () => {
  try {
    await connect();
  } catch (err) {
    console.error('Mongo init failed:', err);
    process.exit(1);
  }
})();

const app = express();

// ----- view engine -----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// ----- middleware -----
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----- mount routes -----
app.use('/', indexRouter);
app.use('/travel', travelRouter);

// API is now served from app_api
app.use('/api', apiRouter);

// ----- 404 -----
app.use((req, res, next) => next(createError(404)));

// ----- error handler -----
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ----- graceful shutdown -----
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
