var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var hbs           = require('hbs');

var indexRouter   = require('./routes/index');
var travelRouter  = require('./routes/travel');
// var usersRouter = require('./routes/users'); // only if you actually have routes/users.js

var app = express();

// ---- view engine setup ----
app.set('views', path.join(__dirname, 'app_server', 'views'));   // you moved views here
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ---- routes ----
app.use('/', indexRouter);
app.use('/travel', travelRouter);
// app.use('/users', usersRouter); // enable only if routes/users.js exists

// ---- 404 ----
app.use(function(req, res, next) {
  next(createError(404));
});

// ---- error handler ----
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
