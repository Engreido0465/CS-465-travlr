var fs = require('fs');
var mealsData = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8')); // Load meals data from meals.json

/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Meals at Travlr Getaways', meals: mealsData }); // Render meals.hbs with meals data
};

module.exports = {
    meals
};
