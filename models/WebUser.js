//-- SQL Database ORM templates, essentially
const { Model, DataTypes } = require('sequelize');
//SQL Database ORM
const {sequelize} = require('../config/connection');
//-- Password encryption
const bcrypt = require('bcrypt');

//------------------------------------------------------------
//-- Class

// create our User model
class WebUser extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//------------------------------------------------------------

// define table columns and configuration
WebUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    //-- Type of users used for access to unique things
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    login_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    logout_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    login_state: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  },
  {
    // events called by Sequalize based on hook chosen. HASHES PW TO BE SAVED INSTEAD OF OG
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'webuser'
  }
);
  
//-----------------------------------------------------------------------------
//-- EXPORTS

module.exports = WebUser;