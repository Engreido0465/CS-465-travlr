// app_server/controllers/travel.js
const fs   = require('fs');
const path = require('path');

// small helper so we can read JSON safely
function readJson(relPath, arrayProp) {
  const file = path.join(__dirname, relPath);
  try {
    const raw  = fs.readFileSync(file, 'utf8');      // <- 'utf8' (no dash)
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : (arrayProp ? json[arrayProp] || [] : []);
  } catch (err) {
    console.error(`Failed to read ${relPath}:`, err.message);
    return [];
  }
}

// ---- routes ----
module.exports.home = (req, res) => {
  res.render('index', { title: 'Travlr Getaways', home: true });
};

// ROOMS -> loads /data/rooms.json
module.exports.rooms = (req, res) => {
  const roomsList = readJson('../../data/rooms.json', 'rooms');
  res.render('rooms', { title: 'ROOMS', rooms: true, roomsList });
};

// TRAVEL -> loads /data/trips.json
module.exports.travel = (req, res) => {
  const trips = readJson('../../data/trips.json', 'trips');
  res.render('travel', { title: 'TRAVEL', travel: true, trips });
};

// the rest just render simple pages
module.exports.meals    = (req, res) => res.render('meals',    { title: 'MEALS',   meals:   true });
module.exports.news     = (req, res) => res.render('news',     { title: 'NEWS',    news:    true });
module.exports.about    = (req, res) => res.render('about',    { title: 'ABOUT',   about:   true });
module.exports.contact  = (req, res) => res.render('contact',  { title: 'CONTACT', contact: true });
