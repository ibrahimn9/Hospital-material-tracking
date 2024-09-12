const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const State = sequelize.define('States', {
    stateID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  
module.exports = State;