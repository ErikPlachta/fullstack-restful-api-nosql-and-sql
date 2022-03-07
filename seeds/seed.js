/*
  Run this with the bash command `npm run seed` 

  This purges the database and then creates clean data based on models, and the
  seed data in root.

*/

require('dotenv').config(); //-- for local variable caching
const { sequelize, db } = require('../../config/connection')

//------------------------------------------------------------------------------
//-- Building seed database within MySQL Database
async function seedDatabase () {
  try {
    // Execute in parallel. Once all compelted, move on.
    await Promise.all([
      db.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`),
      db.query('select sleep(4)'),
      db.query(`CREATE DATABASE ${process.env.DB_NAME}`),
    ])
    .then(console.log())
    
    await db.end(); //-- Close connection
    return true; //-- return true as promise
  }
  catch (err) { 
    console.log(err);
    await db.end(); //-- Close connection
    return false; //-- return true as promise
  };
};

//------------------------------------------------------------------------------
//-- Building seed tables with Sequelize based on Model data and seed JSON data
async function seedTables() {

  //-- Grab database Table models
  const { WebUser } = require('../../models');

  //-- Grab seed data to build a seed database
  const seed_Users = require('./seed_WebUser.json');
  
  //-- wait for connection to database
  await sequelize.sync({ force: true });

  // -- Grab all users and build Table based on Model
  const users = await WebUser.bulkCreate(
    seed_Users, { individualHooks: true, returning: true,}
  );
  
  console.log(`\n//-- Created Users\n`)
  console.log(`//-----------------------------------------------------------\n`)
  
  //-- exit once done building seed database data
  process.exit(0);
};


//------------------------------------------------------------------------------
//-- RUNNIUNG

const seed = async () => {

  seedDatabase()
    .then( results => console.log(`//-- database creation successful: ${results}`))
    .then(() => seedTables())
    .then( () => process.exit(0))
    //-- print error if happens
    .catch(console.log)
};

//------------------------------------------------------------------------------
//-- RUNNING 

seed();

