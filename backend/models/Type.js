const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Type = sequelize.define('Type', {
  typeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TypeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Type',
  timestamps: false,
});

module.exports = Type;
