const express = require('express');
// const { mongoose } = require('./config/connection');
const {mongoose, sequelize, db} = require('./config/connection');
const hbs = require ('./config/handlebars');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//-- onboarding Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use this to log mongo queries being executed
mongoose.set('debug', true);

app.use(routes);

// //-- Use existing tables if exist, start connection to express and SQL
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://127.0.0.1:${PORT}`));
});

// Use this to log mongo queries being executed!
// app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
