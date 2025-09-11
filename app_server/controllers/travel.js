const path = require('path');
const hbs  = require('hbs'); // already present if you used --view=hbs

// (optional now, but needed once we add partials in step 2)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// keep the existing index router require
const travelRouter = require('./app_server/routes/travel');

// C:\Usr\CS-465\travlr\app_server\controllers\traveler.js
exports.home = (req, res) => {
  res.render('index', { title: 'Travlr Getaways', home: true });
};

exports.travel = (req, res) => {
  res.render('travel', { title: 'TRAVEL', travel: true });
};

// Stub the rest so the nav works now — you can add real templates later
exports.rooms = (req, res) => {
  res.render('rooms', { title: 'ROOMS', rooms: true });
};
exports.meals = (req, res) => {
  res.render('meals', { title: 'MEALS', meals: true });
};
exports.news = (req, res) => {
  res.render('news', { title: 'NEWS', news: true });
};
exports.about = (req, res) => {
  res.render('about', { title: 'ABOUT', about: true });
};
exports.contact = (req, res) => {
  res.render('contact', { title: 'CONTACT', contact: true });
};

app.use('/travel', travelRouter);
