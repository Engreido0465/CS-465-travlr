var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

// Update the paths to point to the routes in the app_server directory
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var mealsRouter = require('./app_server/routes/meals'); // Add meals route
var roomsRouter = require('./app_server/routes/rooms'); // Add rooms route

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views')); // Update views directory to app_server/views
app.set('view engine', 'hbs');

// Register handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/meals', mealsRouter); // Register the meals route
app.use('/rooms', roomsRouter); // Register the rooms route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;