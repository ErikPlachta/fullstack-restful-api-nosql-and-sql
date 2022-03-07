//-- access to stylesheet within express app for Handlebars.js
const path = require('path');

//-- assigning helper function route to handlebars and onboarding
const exphbs = require('express-handlebars');
const helpers = require('../utils/helpers');

const hbs = exphbs.create({helpers});


module.exports = hbs;