var fs = require('fs');
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/* GET rooms view */
const roomsPage = (req, res) => {
    res.render('rooms', { title: 'Rooms - Travlr Getaways', rooms });
};

module.exports = {
    roomsPage
};
