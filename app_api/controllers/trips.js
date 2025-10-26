const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// --------------------------------------------------------
// GET: /trips - list all trips
// --------------------------------------------------------
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({});
    res.status(200).json(trips);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// --------------------------------------------------------
// GET: /trips/:tripCode - find trip by code
// --------------------------------------------------------
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// --------------------------------------------------------
// POST: /trips - add a new trip
// --------------------------------------------------------
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --------------------------------------------------------
// PUT: /trips/:tripCode - update an existing trip
// --------------------------------------------------------
const tripsUpdateTrip = async (req, res) => {
  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!q) {
      return res.status(400).json({ message: "Trip not found" });
    }

    res.status(201).json(q);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --------------------------------------------------------
// Export controllers
// --------------------------------------------------------
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
