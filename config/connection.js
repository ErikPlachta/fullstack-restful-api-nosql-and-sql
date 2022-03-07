// Import mysql2 library used with Sequelize
const mysql = require('mysql2/promise');
// import the MySQL ORM
const Sequelize = require('sequelize');
//-- Import MongoDB DRM
const mongoose = require("mongoose");
//-- Accesss to .env variables
require('dotenv').config();


//-- MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//-- Sequelize Connection
let sequelize; //-- declared here so can be defined depend on env

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} 
else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
};

const db = mysql.createPool({
    host: process.env.SERVER_PATH,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
    },
    console.log(`//-- Connection MYSQL database with npm package mysql2 success!`)
);


module.exports = { mongoose , sequelize, db };
// module.exports = { mongoose };
