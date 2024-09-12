const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Services', {
    servID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    structureID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'structures',
        key: 'structureID'
      }
    }
  });

module.exports = Service