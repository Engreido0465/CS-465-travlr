'use strict';

/**
 * app_server/controllers/travel.js
 * - Renders HBS pages for the public site
 * - Reads local JSON for rooms
 * - Calls the Express API for trips
 */

const fs   = require('fs');
const path = require('path');

/* ------------------------------------------------
 * Safe JSON reader (works for local files like /data/rooms.json)
 * relPath is relative to THIS file's directory.
 * If arrayProp is supplied, return that array; otherwise return full JSON.
 * Always returns [] on error when arrayProp is requested.
 * ----------------------------------------------*/
function readJson(relPath, arrayProp) {
  const file = path.join(__dirname, relPath);
  try {
    const raw  = fs.readFileSync(file, 'utf8');    // utf8 (no dash)
    const json = JSON.parse(raw);
    return Array.isArray(json)      ? json
         : arrayProp && Array.isArray(json[arrayProp]) ? json[arrayProp]
         : arrayProp ? [] : json;
  } catch (err) {
    console.error(`Failed to read '${relPath}':`, err.message);
    return arrayProp ? [] : [];
  }
}

/* ===================== Page handlers ===================== */

module.exports.home = (req, res) => {
  res.render('index', { title: 'Travlr Getaways', home: true });
};

/**
 * ROOMS — still loaded from /data/rooms.json so your rooms.hbs
 * can iterate {{#each roomsList}} … {{/each}}
 */
module.exports.rooms = (req, res) => {
  const roomsList = readJson('../../data/rooms.json', 'rooms');
  console.log('Rooms loaded:', roomsList.length);
  res.render('rooms', { title: 'ROOMS', rooms: true, roomsList });
};

/**
 * TRAVEL — fetches trips from our API instead of /data/trips.json
 * so the page shows the MongoDB data.
 */
module.exports.travel = async (req, res) => {
  try {
    // Build base URL of this server (works for localhost and most deployments)
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const apiRes = await fetch(`${baseUrl}/api/trips`, {
      headers: { Accept: 'application/json' }
    });

    if (!apiRes.ok) {
      throw new Error(`API responded ${apiRes.status}`);
    }

    const data = await apiRes.json();
    // API returns: { trips: [...] }
    const trips = Array.isArray(data?.trips) ? data.trips : [];

    return res.render('travel', {
      title: 'TRAVEL',
      travel: true,            // nav highlight
      trips                    // HBS expects an array named "trips"
    });

  } catch (err) {
    console.error('Travel controller error:', err.message);
    // Render gracefully with empty list; optional tiny error flag to display in HBS if you want
    return res.render('travel', {
      title: 'TRAVEL',
      travel: true,
      trips: [],
      error: 'Unable to load trips from the API.'
    });
  }
};

/* ===================== Simple static pages ===================== */

module.exports.meals   = (req, res) => res.render('meals',   { title: 'MEALS',   meals:   true });
module.exports.news    = (req, res) => res.render('news',    { title: 'NEWS',    news:    true });
module.exports.about   = (req, res) => res.render('about',   { title: 'ABOUT',   about:   true });
module.exports.contact = (req, res) => res.render('contact', { title: 'CONTACT', contact: true });
