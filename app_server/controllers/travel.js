// app_server/controllers/traveler.js
const fs = require('fs');
const path = require('path');

/**
 * Load trips from /data/trips.json
 * Returns [] if the file is missing or malformed.
 */
function loadTrips() {
  const file = path.join(__dirname, '../../data/trips.json');
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    // Support both [{...}, ...] or { trips: [{...}, ...] }
    return Array.isArray(json) ? json : (json.trips || []);
  } catch (err) {
    console.error('Failed to read trips.json:', err.message);
    return [];
  }
}

// HOME
module.exports.home = (req, res) => {
  res.render('index', { title: 'Travlr Getaways', home: true });
};

// TRAVEL — reads JSON and passes it to the view
module.exports.travel = (req, res) => {
  const trips = loadTrips();
  res.render('travel', { title: 'TRAVEL', travel: true, trips });
};

// Stubs so the nav works (add real templates later if you want)
module.exports.rooms = (req, res) => {
  res.render('rooms', { title: 'ROOMS', rooms: true });
};

module.exports.meals = (req, res) => {
  res.render('meals', { title: 'MEALS', meals: true });
};

module.exports.news = (req, res) => {
  res.render('news', { title: 'NEWS', news: true });
};

module.exports.about = (req, res) => {
  res.render('about', { title: 'ABOUT', about: true });
};

module.exports.contact = (req, res) => {
  res.render('contact', { title: 'CONTACT', contact: true });
};
